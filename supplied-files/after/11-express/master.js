const cluster = require( 'cluster' );
const os = require( 'os' );

console.log( 'process.pid = ', process.pid );

if( cluster.isMaster ) {
    for( let i = 0; i < os.cpus().length; i++ ) {
        cluster.fork();
    }
} else {
    require( './index.js' );
}