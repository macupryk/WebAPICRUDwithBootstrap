
//Angular controller 
myapp.controller('crudcontroller', function ($scope, crudservice) {
    
    //Loads all Employee records when page loads
    loadEmployees();
    function loadEmployees() {
        var EmployeeRecords = crudservice.getAllEmployees();
        EmployeeRecords.then(function (d) {     //success
            $scope.Employees = d.data;
        },
        function(){
            swal("Oops..","Error occured while loading","error"); //fail
        });
    }

    //save form data
    $scope.save = function () {
        //debugger;
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.AddNewForm.$invalid) {

            swal("Validation failed, try again to save", "info");
            return;
        }

        var Employee = {
            EmpNo:$scope.EmpNo,
            EmpName: $scope.EmpName,
            Email: $scope.Email,
            DeptName: $scope.DeptName,
            Designation: $scope.Designation
        };
        var saverecords = crudservice.save(Employee);
        saverecords.then(function (d) {
            $scope.EmpNo = d.data.EmpNo;
            loadEmployees();
            swal("Reord inserted successfully");
           
            $scope.resetSave();
           
        },
        function(){
            swal("Oops..","Error occured while saving",'error');
        });
    }

    //reset controls after save
    $scope.resetSave = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.EmpNo = '';
        $scope.EmpName = '';
        $scope.Email = '';
        $scope.DeptName = '';
        $scope.Designation = '';
    }


   
    //get single record by ID

    $scope.get = function (Employee) {
        //debugger;
        var singlerecord = crudservice.get(Employee.EmpNo);
        singlerecord.then(function (d) {
            //debugger;
            var record = d.data;
            $scope.UpdateEmpNo = record.EmpNo;
            $scope.UpdateEmpName = record.EmpName;
            $scope.UpdateEmail = record.Email;
            $scope.UpdateDeptName = record.DeptName;
            $scope.UpdateDesignation = record.Designation;
        },
        function(){
            swal("Oops...","Error occured while getting record","error");
        });
    }

    //update Employee data
    $scope.update = function () {
        //debugger;
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.UpdateEmployeeForm.$invalid)
        {
            swal("Validation failed, try again to update","info");
            return;
        }

        
        var Employee = {
            EmpNo: $scope.UpdateEmpNo,
            EmpName: $scope.UpdateEmpName,
            Email: $scope.UpdateEmail,
            DeptName: $scope.UpdateDeptName,
            Designation:$scope.UpdateDesignation
        };
      
        var updaterecords = crudservice.update($scope.UpdateEmpNo, Employee);
        updaterecords.then(function (d) {
            loadEmployees();
            swal("Record updated successfully");
            $scope.resetUpdate();
            
        },
        function () {
            swal("Opps...","Error occured while updating","error");
        });
    }

    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.UpdateEmpNo = '';
        $scope.UpdateEmpName = '';
        $scope.UpdateEmail = '';
        $scope.UpdateDeptName = '';
        $scope.UpdateDesignation = '';
    }

    //delete Employee record
    $scope.delete = function (UpdateEmpNo) {
        
        var deleterecord = crudservice.delete($scope.UpdateEmpNo);
        deleterecord.then(function (d) {
            var Employee = {
                EmpNo: '',
                EmpName: ''                
            };
            loadEmployees();
            swal("Record deleted succussfully");
            $scope.$broadcast('show-errors-reset');
        });
    }
});