import express, { Request, Response } from 'express';
import { Schema, model, connect } from 'mongoose';
import { createClient } from "redis"

const mongoUri = "mongodb://mongo:27017"
const redisUri = "redis://redis:6379"

const app = express();
app.use(express.json())
const port = 3000;

interface IUser {
    ci: string,
    nombre: string | undefined,
    apellido: string | undefined,
    edad: number
}

interface IAddress {
    ciUsuario: string,
    departamento: string | undefined,
    localidad: string | undefined,
    calle: string | undefined,
    numero: number | undefined,
    apartamento: string | undefined,
    padron: string | undefined,
    ruta: string | undefined,
    kilometro: number | undefined,
    letra: string | undefined,
    barrio: string | undefined
}

const addressSchema = new Schema<IAddress>({
    ciUsuario: { type: String, required: true },
    departamento: { type: String, required: false },
    localidad: { type: String, required: false },
    calle: { type: String, required: false },
    numero: { type: Number, required: false },
    apartamento: { type: String, required: false },
    padron: { type: String, required: false },
    ruta: { type: String, required: false },
    kilometro: { type: Number, required: false },
    letra: { type: String, required: false },
    barrio: { type: String, required: false }
})

const userSchema = new Schema<IUser>({
    ci: { type: String, required: true },
    nombre: { type: String, required: false },
    apellido: { type: String, required: false },
    edad: { type: Number, required: false },
});

(async () => {
    await connect(mongoUri)

    const redisClient = createClient({ url: redisUri })

    await redisClient.connect()

    const User = model<IUser>("user", userSchema);
    const Address = model<IAddress>("address", addressSchema)

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, TypeScript Express!');
    });

    app.put("/agregar-usuario", async (req: Request, res: Response) => {
        const user: IUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            ci: req.body.ci
        }

        if (user.ci == undefined) {
            res.status(400).send("La CI es obligatoria")
        } else {
            const savedUser = await User.findOne({ ci: user.ci })
            if (!savedUser) {
                await new User({
                    nombre: user.nombre ?? undefined,
                    apellido: user.apellido ?? undefined,
                    ci: user.ci,
                    edad: user.edad ?? undefined
                }).save()
                res.status(200).send("OK!")
            } else {
                res.status(401).send("La persona ya existe.")
            }
        }
    });

    app.put("/agregar-domicilio", async (req: Request, res: Response) => {
        const address: IAddress = {
            ciUsuario: req.body.ciUsuario,
            departamento: req.body.address.departamento,
            localidad: req.body.address.localidad,
            calle: req.body.address.calle,
            numero: req.body.address.numero,
            padron: req.body.address.padron,
            ruta: req.body.address.ruta,
            letra: req.body.address.letra,
            barrio: req.body.address.barrio,
            apartamento: req.body.address.apartamento,
            kilometro: req.body.address.kilometro,
        }

        const savedUser = await User.findOne({ ci: address.ciUsuario })

        if (!!savedUser) {
            await new Address({
                ciUsuario: address.ciUsuario,
                departamento: address.departamento ?? undefined,
                localidad: address.localidad ?? undefined,
                calle: address.calle ?? undefined,
                numero: address.numero ?? undefined,
                apartamento: address.apartamento ?? undefined,
                padron: address.padron ?? undefined,
                ruta: address.ruta ?? undefined,
                kilometro: address.kilometro ?? undefined,
                letra: address.letra ?? undefined,
                barrio: address.barrio ?? undefined
            }).save()
            res.status(200).send("Se ha guardado correctamente")
        } else {
            res.status(402).send("No existe una persona con la cedula aportada como parametro")
        }
    });


    app.post("/direcciones-ordenadas", async (req: Request, res: Response) => {

        let localidad = req.body.localidad ?? ""
        let barrio = req.body.barrio ?? ""
        let departamento = req.body.departamento ?? ""

        let cacheKey = (localidad + barrio + departamento).replace(/\s/g, "");
        let cacheResponse = await redisClient.get(cacheKey)

        if (cacheResponse != null) {
            res
                .status(200)
                .send(
                    {
                        source: "cache",
                        data: JSON.parse(cacheResponse)
                    }
                )
        } else {
            let addresses = await Address.find({
                $or: [
                    {
                        localidad: localidad
                    },
                    {
                        barrio: barrio
                    },
                    {
                        departamento: departamento
                    }
                ]
            })
            if(addresses.length != 0) {
                redisClient.set(cacheKey, JSON.stringify(addresses))
            }
            res.status(200)
            .send({
                source: "database",
                data: addresses
            })
        }
    });

    app.get("/direcciones-usuario", async (req: Request, res: Response) => {
        let paramCi = req.query.ciUsuario
        let paramPage = +(req.query.page ?? 1)
        let paramResults = +(req.query.results ?? 20)
        if(!paramCi) {
            res.status(402).send("La CI es obligatoria")
            return
        }
        
        const user = await User.find({ci: paramCi})
        if(!user) {
            res.status(402).send("No existe una persona con la cédula aportada como parámetro")
            return
        }

        let addresses = Address.find({ciUsuario: paramCi}) //.skip(paramPage * paramResults).limit(paramResults)
        let finalAddress
        if(!!paramPage || !!paramResults) {
            finalAddress = await addresses.skip((Math.max(paramPage - 1, 0) * paramResults)).limit(paramResults)
        } else {
            finalAddress = await addresses
        }
    
        res.status(200).send({
            usuario: user,
            addresses: finalAddress
        })

    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

})();