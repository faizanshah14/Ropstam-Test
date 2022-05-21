import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
export function getAllpollicies(){
    return axios.get("/policy/getAllPolicies")
    .then(res => res.data)
    .catch(err => console.log(err));
}
export function createEmployee(data){
    return axios.post("/employee/createEmployee",data)
    .then(res => res.data)
    .catch(err => console.log(err));
}

export function getAllCategories(){
    return axios.get("/category/getAllCategories")
    .then(res => res.data)
    .catch(err => console.log(err));
}
export function getPoliciesByCategory(id){
    return axios.get("/policy/getPoliciesByCategory/"+id)
    .then(res => res.data)
    .catch(err => console.log(err));
}