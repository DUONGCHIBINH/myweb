//binh  
$(document).ready(function () {

    var api_url = 'https://203.113.174.16:9090/'


    //hàm kiểm tra
    $("#btCheck").click(function () {

        // $.ajax({
        //     url: api_url + "/api/BV_KhaibaoYTe/GetBySoDT?soDT= 0981389693" ,//+ $("#sdt")[0].value,
        //     contentType: "application/json",
        //     dataType: 'json',
        //     crossDomain:true,
        //     success: function(result){
        //         console.log(result);
        //     }
        // })
        fetch('https://203.113.174.16:9090/api/BV_KhaibaoYTe/GetBySoDT?SoDT=' + $("#sdt")[0].value)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.length != 0) setform(data[0])
                else alert('Số điện thoại này chưa khai báo trước đây')
            }

            );

    });


    //hàm kiểm tra
    $("#btKhaibao").click(function () {

        //kiểm tra dữ liệu



        //post request
console.log(getform())
        fetch('http://203.113.174.16:9090/api/BV_KhaibaoYTe/SaveOrUpdate', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(getform())
        }).then(res => res.json())
            .then(res => console.log(res));


        // var base_url = window.location.origin + "/qr.html?sdt="+$("#sdt")[0].value;
        // $(location).attr('href', base_url)
  

    });




});


function setform(ob) {
    $("#name")[0].value = ob.Hoten;

    if (ob.Ngaysinh != null) $("#date")[0].value = ob.Ngaysinh.toISOString().slice(0, 10);

    $("#address")[0].value = ob.Diachi;

    if (ob.Gioitinh == "Nam") {
        $('#nam').attr('checked', 'checked');
        $('#nu').attr('checked', 'unchecked');
    }
    else {
        $('#nu').attr('checked', 'checked');
        $('#nam').attr('checked', 'unchecked');
    }

}

function getform() {

    var today = new Date();
    var ob = {

        "BUID": "SHPT",
        "Thoigian": today,
        "Hoten": $("#name")[0].value,
        "Diachi": $("#address")[0].value,
        "Dienthoai": $("#sdt")[0].value,

        "Cactrieuchung": null,
        "TiepxucF0": null,
        "TiepxucF1": null,
        "TiepxucF2": null,
        "TiepxucF3": null,
        "TiepxucF4": null,
        "VetuNN": null,
        "VetuNNTennuoc": null,
        "VetuVungdich": null,
        "VetuVungdichKhac": null,
    }

    ob.Ngaysinh = new Date($("#date")[0].value);

    if ($('#nam')[0].checked) ob.Gioitinh = "Nam";
    else ob.Gioitinh = "Nữ";



    //bệnh
    if ($('#2a')[0].checked) ob.TiepxucF0 = "True";
    else ob.TiepxucF0 = "False";

    if ($('#3a')[0].checked) ob.TiepxucF1 = "True";
    else ob.TiepxucF1 = "False";

    if ($('#4a')[0].checked) ob.TiepxucF2 = "True";
    else ob.TiepxucF2 = "False";

    if ($('#5b')[0].checked) { ob.VetuNN = "True"; ob.VetuNNTennuoc = $("#nuocngoaikhac")[0].value }
    else ob.VetuNN = "False";

    if ($('#6b')[0].checked) { ob.VetuVungdich = "True"; ob.VetuVungdichKhac = $("#vungdichkhac")[0].value }
    else ob.VetuVungdich = "False";

    var trieuchung = $('input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    ob.trieuchung = trieuchung.join(";");

    return ob;

}