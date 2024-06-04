var bd = require('mysql');

var conexion = bd.createConnection({
    host: '34.170.100.252',
    database: 'utal_asistencia_1',
    user: 'root',
    password:'',
});

conexion.connect(function(error){
    if(error){
        console.log('NOP');
        console.log(error);
    }else{
        console.log('SI SE PUDO');
    }
});

conexion.end();