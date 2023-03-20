

let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList=getEmployeePayrollDataFromStorage();
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () =>{
    return localStorage.getItem('EmployeePayrollList')?
    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const createInnerHtml = () =>{
    if(empPayrollList.length == 0) return;
    const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>" +
    "<th>Start Date</th><th>Actions</th>";

    let innerHtml = `${headerHtml}`;
     for(const empPayrollData of empPayrollList){
        innerHtml =  `${headerHtml}
            <tr>
                <td><img class="profile" src="${employeePayrollData._profilePic}" alt=""></td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${stringifyDate(employeePayrollData._startDate)}</td>
                <td>
                    <img id="${employeePayrollData._id}" onclick="remove(this)" src="../Assests/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${employeePayrollData._id}" onclick="update(this)" src="../Assests/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml=`${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

// UC 1
const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList
                    .map(empData => empData._id)
                    .indexOf(employeePayrollData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
};

//UC 2
const update = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._id == node.id);
    if (!employeePayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}
