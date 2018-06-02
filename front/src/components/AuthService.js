// export default class AuthService {
//     // fetch = this.fetch.bind(this);
//     // login = this.login.bind(this);

//     login(email, password) {
//         return this.fetch("/auth/login", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email,
//                 password
//             }).then(res => {
//                 console.log(res)
//             })
//         })
//     }
// }