sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            var oEmpModel = new sap.ui.model.json.JSONModel();
            var oDataModel = this.getOwnerComponent().getModel();
            this.getView().setModel("oDataModel", oDataModel);
            this.getView().setModel(oEmpModel, "EmpModel");
            this.getView().getModel("EmpModel").setProperty("/TableDetails", []);
            this.bindData();
        },
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
                    this.bindData();
                }.bind(this),
                error: function (oError) {
                    MessageBox.error("Error: " + oError.message);
                }
            });
        },
        bindData: function () {
            var oReadingModel = new sap.ui.model.json.JSONModel();
            var oDataModel = this.getOwnerComponent().getModel();
            oDataModel.read("/Employees", {
                success: function (oData) {
                    this.clearFields();
                    oReadingModel.setData(oData);
                    this.getView().setModel(oReadingModel, "ReadingModel");
                }.bind(this),
                error: function () {}
            });
        },
        onDelete:function(oEvent){
            var oDataModel = this.getOwnerComponent().getModel();
            var rowPath = oEvent.getSource().getParent().getBindingContext("ReadingModel").sPath;
            var RowData = oEvent.getSource().getParent().getBindingContext("ReadingModel").getProperty(rowPath);
            var Id = RowData.Id;
            

            var sDeletePath = `/Employees(guid'${Id}')`;

            console.log(sDeletePath);

            oDataModel.remove(sDeletePath,{
                success:function(){
                    this.bindData();
                    sap.m.messageToast.show("Item deleted");
                   
                }.bind(this),
                error:function(){
                    sap.m.messageToast.show("Error while deleting");
                }
            })

        },
        clearFields:function(){
            this.getView().byId("nameInput").setValue("");
            this.getView().byId("ageInput").setValue("");
            this.getView().byId("departmentInput").setValue("");
            this.getView().byId("salaryInput").setValue("");
            this.getView().getModel("EmpModel").setProperty("/TableDetails", []);
        }
    });
});
