let listStudent =[
    ["SV001","Nguyen Van A","abc@gmail.com","0345678923","Ha Noi","Male"]
];
let action= "create";
function renderData() {
    let tbody = document.getElementById("content");
    tbody.innerHTML="";
    for (let index = 0; index < listStudent.length; index++) {
        tbody.innerHTML+=`<tr>
                             <td>${index+1}</td>
                             <td>${listStudent[index][0]}</td>
                             <td>${listStudent[index][1]}</td>
                             <td>${listStudent[index][2]}</td>
                             <td>${listStudent[index][3]}</td>
                             <td>${listStudent[index][4]}</td>
                             <td>${listStudent[index][5]}</td>
                            <td>
                                <button onclick="editStudent('${listStudent[index][0]}')">Edit</button>
                                <button onclick="deleteStudent('${listStudent[index][0]}')">Delete</button>
                             </td>
       </tr>`
        
    }
}

function validateForm() {
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.getElementById("input[name='gender':checked]");
    if (studentId =="") {
        alert("vui long ma sinh vien");
        return false;
    }
    if (studentName=="") {
        alert("vui long nhap ho ten");
        return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        alert("vui long nhap email dung dinh dang");
        return false;
    }
    if (!phone.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)) {
        alert("vui long nhap phone dung dinh dang");
        return false;
    }
    return true;
}

function createOrEdit() {
    if (validateForm()) {
        let studentId = document.getElementById("studentId").value;
        let studentName = document.getElementById("studentName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let sex = document.querySelector("input[name='gender']:checked").value;
        if (action=="create") {
             listStudent.push([studentId,studentName,email,phone,address,sex]);
        }else{
            let index = getStudentByStudentId(studentId);
            listStudent[index][1] = studentName;
            listStudent[index][2] = email;
            listStudent[index][3] = phone;
            listStudent[index][4] = address;
            listStudent[index][5] = sex;
            document.getElementById("studentId").readOnly= false;
    
        }
        document.getElementById("studentId").value="";
        document.getElementById("studentName").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
        document.getElementById("address").value="";
        document.getElementById("male").checked=true;
        renderData();
    }
    
}

function getStudentByStudentId(studentId) {
    for (let index = 0; index < listStudent.length; index++) {
        if (studentId==listStudent[index][0]) {
            return index;
        }
    }
    return -1;
}

function editStudent(studentId) {
    let index = getStudentByStudentId(studentId);
    if (index>=0) {
        document.getElementById("studentId").value=listStudent[index][0];
        document.getElementById("studentName").value=listStudent[index][1];
        document.getElementById("email").value=listStudent[index][2];
        document.getElementById("phone").value=listStudent[index][3];
        document.getElementById("address").value=listStudent[index][4];
        if (listStudent[index][5]=="Male") {
            document.getElementById("male").checked=true;
        }else{
            document.getElementById("female").checked=true;
        }
        document.getElementById("studentId").readOnly= true;
       action= "edit";
    }
}

function deleteStudent(studentId) {
    let index = getStudentByStudentId("studentId");
    listStudent.splice(index,1);
    renderData();
}

document.onload= renderData();
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click",function (event) {
    event.preventDefault();
    createOrEdit();
});

