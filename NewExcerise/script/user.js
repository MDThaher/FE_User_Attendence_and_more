var formId = document.getElementById('form1')
const tabledatabody = document.getElementById('table_body');
const bn = document.querySelector('.btn');



formId.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var gender = document.getElementsByName('gender');
    var gen=null;
            if(gender[0].checked){
                gen = gender[0].value;
            }else{
                gen = gender[1].value;
            }
    var address = document.getElementById('address').value;
    var pincode = document.getElementById('pincode').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var email = document.getElementById('email').value;
    var Sno = document.getElementById('Sno').value;

    
    fetch('http://localhost:8080/addUserForm', {
  method: 'POST',
  body: JSON.stringify({
    id:Sno,
    name: name,
    gender: gen,
    address: address,
    pincode: pincode,
    city: city,
    state: state,
    email: email,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((data)=>{
    // console.log(data);
    return data.json();
}).then((completedata)=>{
    console.log(completedata);
})
alert('Data is submited');
location.reload();
})


// get api


var formId2 = document.getElementById('form2')
formId2.addEventListener('submit', function(e){
  e.preventDefault();
  var no = document.getElementById('no1').value;

  fetch('http://localhost:8080/userForm/'+no)
.then((data)=>{
    // console.log(data);
    return data.json();
}).then((completedata)=>{
    console.log(completedata);
    document.getElementById('nameid')
    .innerHTML = completedata.name;
    document.getElementById('emailid')
    .innerHTML = completedata.email;
    document.getElementById('genderid').innerHTML = completedata.gender;
    document.getElementById('addressid').innerHTML = completedata.address;
    document.getElementById('pincodeid').innerHTML = completedata.pincode;
    document.getElementById('cityid').innerHTML = completedata.city;
    document.getElementById('stateid').innerHTML = completedata.state;
})

})


fetch('http://localhost:8080/UserFromAll')
.then((data)=>{
    // console.log(data);
    return data.json();
}).then((completedata)=>{
    console.log(completedata);
    let tableData ="";
    completedata.map((values)=>{
      tableData += `<tr class = "cname" data-id=${values.id}>
      <td class = "cid">${values.id}</td>
      <td class = "cname">${values.name}</td>
      <td class = "cemail">${values.email}</td>
      <td class = "cgender">${values.gender}</td>
      <td class = "caddress">${values.address}</td>
      <td class = "cpincode">${values.pincode}</td>
      <td class = "ccity">${values.city}</td>
      <td class = "cstate">${values.state}</td>
      <td>
      <button id="delete">delete</button>
      <button id="edit">edit</button>
      </td>
      
    </tr>`;
    })

    tabledatabody.innerHTML = tableData;
    
})



//delete data 

tabledatabody.addEventListener('click', (e) => {
  e.preventDefault();
  let deletebtn = e.target.id == 'delete';
  let editbtn = e.target.id == 'edit';
  let d_id = e.target.parentElement.parentElement.dataset.id;
  if(deletebtn){
    fetch('http://localhost:8080/removeUser/'+d_id , {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload())
    console.log('deleted this')
  }

  if(editbtn){
    var parent = e.target.parentElement.parentElement;
    var dataid = parent.querySelector('.cid').textContent;
    var dataname = parent.querySelector('.cname').textContent;
    var dataemail = parent.querySelector('.cemail').textContent;
    var datagender = parent.querySelector('.cgender').textContent;
    var dataaddress = parent.querySelector('.caddress').textContent;
    var datapincode = parent.querySelector('.cpincode').textContent;
    var datacity = parent.querySelector('.ccity').textContent;
    var datastate = parent.querySelector('.cstate').textContent;


    var data1id = document.getElementById('Sno');
    var data2name = document.getElementById('name');
    var data3email = document.getElementById('email');
    var data4address = document.getElementById('address');
    var data5pincode = document.getElementById('pincode');
    var data6city = document.getElementById('city');
    var data7state = document.getElementById('state');
    var data8gender = document.getElementsByName('gender');
  

    data1id.value = dataid;
    data2name.value = dataname;
    data3email.value = dataemail;
    data4address.value = dataaddress;
    data5pincode.value = datapincode;
    data6city.value = datacity;
    data7state.value = datastate;

    if(datagender == 'Male'){
      data8gender[0].checked = true

    }
    
    if(datagender == 'Female'){
      data8gender[1].checked = true
    }

    
    
    var gender = document.getElementsByName('gender');

    function myfun(){
      if(gender[0].checked){
        return gender[0].value
      }else{
        return gender[1].value
      }
    }
    
  }


  
  bn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/updateUserForm/'+d_id, {
    method: 'PUT',
    body: JSON.stringify({
    id: data1id.value,
    name: data2name.value,
    gender: myfun(),
    address: data4address.value,
    pincode: data5pincode.value,
    city: data6city.value,
    state: data7state.value,
    email: data3email.value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  location.reload();
  })

});










