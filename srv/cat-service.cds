using bookshop as db from '../db/schema';

service EmployeeService {
    // @restrict:[
    //     { grant:['READ'], to: 'Viewer' },
    //     {grant:['READ', 'WRITE'], to: 'Viewer'}
    // ]
    entity Employees as projection on db.Employees;
}