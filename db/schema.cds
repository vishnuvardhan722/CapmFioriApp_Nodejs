namespace bookshop;

entity Employees {
    key Id: UUID;  
    Name: String;
    Age: Integer;
    Department: String;
    Salary: Decimal(10, 2);
    COMPENSATION_NAV: Composition of many CompensationDetails on COMPENSATION_NAV.EmployeeId = $self.Id; 
}

entity CompensationDetails { 
    key EmployeeId: UUID;  
    SiNo: Integer;
    Name: String;
    Relationship: String;
    Age: Integer;
    
}
