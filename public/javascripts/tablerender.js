$(document).ready(function(){
    var obj = {};
    $.getJSON('response/userdetails.json',function(data){
        obj = data;
        for(var i=0;i<obj.user.length;i++){
            var users = obj.user[i];
            var template = $("#user").tmpl(users);
            $( "#userTable tbody").append(template);
            if(users.isActive == "true"){
                $( "#todoTable tbody").append($("#user").tmpl(users));
            }
        }
        $('#searchTable button').on('click',function(){
            search(obj);
        });
        console.log(obj)
    })
    setTimeout(function(){
        $('table').DataTable({
            "paging":   false,
            "ordering": false,
            "info":     false,
            "searching":    false
        });
    },0);
    $('form').submit(function(e){
        e.preventDefault();
        
        var addUser = {};
        addUser.Id = $('input[name=id]').val();
        addUser.fName = $('input[name=fName]').val();
        addUser.lName = $('input[name=lName]').val();
        addUser.email = $('input[name=email]').val();
        addUser.pinCode = $('input[name=pincode]').val();
        addUser.birthDate = $('input[name=dob]').val();
        addUser.isActive = $('input[name=active]').val();
        obj.user.push(addUser);
        console.log(obj)
        $('input[type=text],input[type=number],input[type=email],input[type=date]').val('');
        document.getElementById('yes').checked = false;
        document.getElementById('no').checked = false;
        $( "#userTable tbody").append($("#user").tmpl(addUser));
        if(addUser.isActive == "true"){
            $( "#todoTable tbody").append($("#user").tmpl(addUser));
        }
        alert("User details entered into the table!");
    })
    function search(obj){
        console.log(obj)
        var searchId = $('input[name=search]').val();
        if(searchId == '' || searchId == undefined){
            alert('Enter Id');
        }
        for(var j=0;j<obj.user.length;j++){
            if(obj.user[j].Id == Number(searchId)){
                $( "#searchTable tbody").html($("#user").tmpl(obj.user[j]));
            }
        }
    }
});