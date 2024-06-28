const multer = require('multer')
const path = require('path') /* Ruta donde vamos a guardar el archivo */
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: 'public/images/products',
    filename: (req, file, cb) =>{
        
/*         console.log(file)
 */
        crypto.randomBytes(16, (error, buffer) => {

            if(error) return cb(error) /* Si tengo error uso el callback para enviar un mensaje, el error en este caso */

            const filename = buffer.toString('hex') + path.extname(file.originalname) /* Transformo el nombre del archivo a hexadecimal + la extensión del archivo que nosotros recibimos */

            cb(null, filename) /* Devuelvo null en la parte del error ya que fue exitososo y el nombre del archivo cargado */

        })/* Genero un random de 16 bytes donde puedo obtener un error o un buffer */
    } /*request, file, callback */
}) /* definimos la variable para poder desde multer almacenar, con el objeto con propiedades que definimos para el destino de los archivos entre otros */

const upload = multer({storage}).single("image") /* El nombre del single el nombre debe coincidir en el single con lo que se manda desde el front "image" en este caso */

module.exports = upload;