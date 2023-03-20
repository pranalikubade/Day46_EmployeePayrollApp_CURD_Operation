let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });


    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });

    checkForUpdate();

});


const save= ()=>{
    try {
        let employeePayrollData = createEmployeePayroll();
        alert(employeePayrollData.toString());
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}
 
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined){
        employeePayrollList.push(EmployeePayrollData);
    }else{
        employeePayrollList = [EmployeePayrollData]
    }

    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextalue('.text-error', e);
        throw e;
    } 
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}

 // Helper Method
 
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const getInputValueByValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const setForm = () => {
    setValue("#name", employeePayrollObject._name);
    setSelectedValues("[name=profile]", employeePayrollObject._profile);
    setSelectedValues("[name=gender]", employeePayrollObject._gender);
    setSelectedValues("[name=department]", employeePayrollObject._department);
    setValue("#salary", ".salary-output", employeePayrollObject._salary);
    setValue("#notes", employeePayrollObject._note);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}

const resetForm = () => {
    setValues('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValues('#salary', '');
    setValues('#notes', '');
    setValues('#day', '0');
    setValues('#month', '0');
    setValues('#year', '0');
}

/*
 * Helper method for reset form
    propertyValue 
 */
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

// Helper method for reset form
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

 //Helper method for reset form
 const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObject = JSON.parse(employeePayrollJson);
    setForm();
};