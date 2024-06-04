/*aun esta en prueba el login */
var mysql = require('mysql');
var conection = mysql.createConnection({
  host:'34.170.100.252',
  database:'utal_asistencia_1',
  user:'root',
  password:'',
});
conection.connect(function(error)
{
  if(error)
    {
      throw error;
    }
    else
    {
      
      console.log("Conexion correcta")

      var user = 'test';
      var pass = 'pass';
      var borrar = 'DELETE FROM usuarios WHERE id = 2'
      var login = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
      var tablas = "DESCRIBE usuarios";
      var check = "SELECT * FROM usuarios";
      const test = 'INSERT INTO usuarios (nombre, email,rol,password, carrera) VALUES (?,?,?,?,?)';
      const values = ['test','test@utalca.cl','pass','icc','admin'];


      conection.query(login, [user, pass], function(err, results){
        if(err){
          throw err;
        }else{
          if (results.length > 0) {
            console.log("Inicio de sesión exitoso");
          } else {
            console.log("Credenciales inválidas");
          }
        }
        conection.end();
      })

      //Creación de tablas
      /*conection.query(check,function(err, results){
        if(err){
          throw err;
        }else{
          console.log(results);
          conection.end();
        }
      })*/


      //Añadir usuarios (por ahora)
      /*conection.query(test,values,function(err, results){
        if(err){
          throw err;
        }else{
          console.log("Registro insertado, ID:", results.id);
          conection.end();
        }
      })*/


      //Muestra las tablas
      /*conection.query(tablas,function(err, results){
        if(err){
          throw err;
        }else{
          console.log("Lista de tablas");
          results.forEach(function(row) {
            console.log(row); // Esto mostrará la estructura del objeto 'row'
          });
        }
        conection.end();
      })*/
    }
});



