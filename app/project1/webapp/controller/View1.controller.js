sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            var oEmpModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oEmpModel, "EmpModel");
            this.getView().getModel("EmpModel").setProperty("/TableDetails", []);
        },
        // onText(){},

        onPressInsert: function () {
            var oTable = this.getView().byId("EmpTable");
            var oBinding = oTable.getBinding("rows");
            var sData = oTable.getModel("EmpModel").getProperty("/TableDetails");
            var serialNo = sData.length + 1;
            console.log(serialNo);

            var Data = {
                "SiNo": serialNo,
                "Name": "",
                "Relationship": "",
                "Age": ""
            };
            sData.push(Data);
            oBinding.refresh(true);
        },

        onSubmit: function () {
            var jmodel = this.getView().getModel("EmpModel");
            var sData = jmodel.oData.TableDetails;

            var Data = {
                Name: this.getView().byId("nameInput").getValue(),
                Age: this.getView().byId("ageInput").getValue(),
                Department: this.getView().byId("departmentInput").getValue(),
                Salary: this.getView().byId("salaryInput").getValue(),
                COMPENSATION_NAV: sData
            };

            var oModel = this.getView().getModel();
            oModel.create("/Employees", Data, {
                success: function () {
                    MessageToast.show("Employee added successfully!");
                },
                error: function (oError) {
                    MessageBox.error("Error: " + oError.message);
                }
            });
        }
    });
});
