$(function(){
  $(window).resize(function(){
    if ($(window).width() <= 562){
      $("#sidebar").removeClass("active");
    }
    else {
      $("#sidebar").addClass("active");
    }
  });

  $("#sidebarCollapse").resize(function(){
    $("#sidebarCollapse> i").css("line-height",`${$("img[alt='branding']").height()}px`)
  }).trigger('resize');

  $("#sidebarCollapse").on("click",function(){
    $("#sidebar").toggleClass("active");
    $("#close").toggle();
    $("#open").toggle();
  });

  $("#image").change(function(){
    if (this.files && this.files[0]){
        if (!validateImageFile(this.files[0])){
          this.validity.valid = false
          $("#invalid-msg").show();
          return
        }
        else {
          this.validity.valid = true
          $("#invalid-msg").hide();
        }
        let f = new FileReader()
        f.onload = function(e){
          $("#preview").attr("src",e.target.result);
        }
        f.readAsDataURL(this.files[0]);
    }
  });


  $("#addUserForm").submit(function(e){

    e.preventDefault();

    const formData = new FormData(this);

    if ($(".temp")[0])
      $(".temp")[0].remove();

    data = Object.fromEntries(formData)

    $row = $("<tr>").append(
      `<td>${data['userName']}</td>
      <td>${data['role']}</td>
      <td><i class="small material-icons">edit</i></td>`
    );

    if ($("tbody tr").length == 4){
      let rowHeight = $("tbody tr").outerHeight();
      console.log(rowHeight)
      $("#tableBox").css("height",`${rowHeight*5+1}px`);
    }

    $("#userList> tbody").prepend($row);

    this.reset();
  });

  function validateImageFile(file){
    const fsize = Math.round(file.size/1024);
    const fname = file.name;

    return fsize < 1024 && /.*\.jpg|png$/.test(fname)
  }

});
