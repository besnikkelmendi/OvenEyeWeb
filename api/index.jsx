import ApiImpl from './ApiImpl.jsx';
//import {url} from "../constant/constant.jsx";


//define url for the environment in use
let api = new ApiImpl("http://localhost:8080");
export default api;


// import env from "../config/index.jsx";
// import { envType } from "../config/index.jsx";
// import { urlLocal, urlDev, urlProd } from "../constant/constant.jsx";
// import ApiImpl from './ApiImpl.jsx';
//
// //define url for the environment in use
// let api;
//
// switch (env) {
//     case envType.LOCAL:
//         api = new ApiImpl(urlLocal);
//         break;
//     case envType.DEV:
//         api = new ApiImpl(urlDev);
//         break;
//     case envType.PROD:
//         api = new ApiImpl(urlProd);
//         break;
//     default:
//         api = new ApiImpl(urlLocal);
//
// }
//
// export default api;
