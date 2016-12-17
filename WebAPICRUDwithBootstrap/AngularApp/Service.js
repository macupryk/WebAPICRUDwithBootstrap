

//Service to get data from service..
myapp.service('crudservice', function ($http) {

    this.getAllEmployees = function () {
        return $http.get("/api/EmployeeAPI");
    }

    //save
    this.save = function (Employee) {
        var request = $http({
            method: 'post',
            url: '/api/EmployeeAPI/',
            data: Employee
        });
        return request;
    }

    //get single record by Id
    this.get = function (EmpNo) {
        
        return $http.get("/api/EmployeeAPI/" + EmpNo);
    }

    //update Employee records
    this.update = function (UpdateEmpNo, Employee) {
        
        var updaterequest = $http({
            method: 'put',
            url: "/api/EmployeeAPI/" + UpdateEmpNo,
            data: Employee
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateEmpNo) {
        //debugger;
        var deleterecord = $http({
            method: 'delete',
            url: "/api/EmployeeAPI/" + UpdateEmpNo
        });
        return deleterecord;
    }
});