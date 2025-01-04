module.exports = (srv) => {
    // srv.before('CREATE', 'Employees', async(req) => {
    //     var salary = req.data.Salary;
    //     if (salary < 3000) {
    //         req.error(400, 'Salary cannot be less than 3000.');
    //     }
    //     var age = req.data.Age;

    //     if (age < 18) {
    //         req.error(400, 'age cannot be less than 18');
            
    //     }
    //     var Name = req.data.Name;
       
    //     const existingEmployee = await cds.transaction(req).run(SELECT.one.from('Employees').where({ Name }));

    //     if(existingEmployee){
    //         req.error(400, `Employee with name '${Name}' already exists.`);
    //     }
    // });
};


