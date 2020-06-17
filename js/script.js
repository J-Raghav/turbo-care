$(function(){

  // Swithes active state to minified version of sidebar for width less than 563
  $(window).resize(function(){
    if ($(window).width() < 563){
      $("#sidebar").removeClass("active");
    }
    else {
      $("#sidebar").addClass("active");
    }
  });

  // for vertically centering hambrger icon
  $("#sidebarCollapse").resize(function(){
    $("#sidebarCollapse> i").css("height",`${$("img[alt='branding']").height()}px`);
    $("#sidebarCollapse> i").css("line-height",`${$("img[alt='branding']").height()}px`);
  }).trigger('resize');

  // toggling sidebar
  $("#sidebarCollapse").on("click",function(){
    $("#sidebar").toggleClass("active");
    $("#close").toggle();
    $("#open").toggle();
  });

  // loads preview image and calls validation function on file
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

  // Image validation function
  function validateImageFile(file){
    const fsize = Math.round(file.size/1024);
    const fname = file.name;

    return fsize < 1024 && /.*\.jpg|png$/.test(fname)
  }

  // triggered on form submission and adds user data to table
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
    $("section :nth-child(1)")[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    $("#msg").show();
    setTimeout(function(){
      $("#msg").hide();
    },1500);
  });


});
