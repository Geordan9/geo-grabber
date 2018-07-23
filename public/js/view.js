$(document).ready(() => {
  let urlData;
  let currentUrl;

  $('.dropdown-trigger').dropdown({
    coverTrigger: false,
    closeOnClick: true
  });

  $(document).ready(function () {
    $('.modal').modal();
  });

  $(".sidenav").css("margin-top", $(".navbar-fixed").height());
  $('.sidenav').sidenav({
    edge: 'right'
  });
  const sideNavInstance = M.Sidenav.getInstance($('.sidenav'));

  const dropdownInstance = M.Dropdown.getInstance($('.dropdown-trigger'));

  $("#url-input").on("keypress", (e) => {
    e.preventDefault();
    const key = e.which;
    if (key == 13) {
      toggleDropDown();
    }
  });

  $('.dropdown-button').on("click", () => {
    toggleDropDown();
  });

  function toggleDropDown() {
    const urlInput = $("#url-input");
    $(".dropdown-trigger").css({
      width: urlInput.outerWidth(),
      top: urlInput.outerHeight(),
      left: $('.dropdown-button').outerWidth() + 10
    });
    const data = {
      url: urlInput.val()
    };
    if (currentUrl != data.url) {
      $(".dropdown-content").empty();
      currentUrl = urlInput.val();
      $.post("/api/geturls", data, (res) => {
        urlData = res;
        urlData.adaptiveURLs.map((item, index) => {
          if (typeof item.quality_label != "undefined") {
            dropdownInstance.close()
            const name = item.quality_label.replace("p60", 'p 60fps') + ` ${item.type.split("/")[1]}`;
            const element = $(`<li class="url-link" data-index="${index}" data-url="${item.url}"><p>${name}</p></li>`)
            $('#link-dropdown').append(element);
            dropdownInstance.open();
          }
        });
      });
    } else {
      if (!dropdownInstance.isOpen) {
        dropdownInstance.open();
      } else {
        dropdownInstance.close()
      }
    }
  }

  $('#link-dropdown').on("click", ".url-link", function () {
    const url = $(this).data("url");
    $.post("/api/sendurl", {
      url
    }, (res) => {
      $("#video-player").attr("src", `/api/stream/${res}`)
    });
  });

  $("#sidenav-button").on("click", () => {
    if (!sideNavInstance.isOpen) {
      sideNavInstance.open();
    } else {
      sideNavInstance.close();
    }
  });

  $("#download").on("click", startRecording);

  $("#login-button").on("click", function () {
    const account = {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val()
    };

    if (account.username === "" || account.password === "" || account.email === "") {
      $("#errmsg").text("Please fillout everything.")
    } else {
      $("#errmsg").text("");
      $.post("/api/login", account, function(res) {
        if (res){

        }
        else {
          $("#errmsg").text("Incorrect username and/or password.");
        }
      });
    }

  });

  $("#register-button").on("click", function () {
    const account = {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val()
    };
    if (account.username === "" || account.password === "" || account.email === "") {
      $("#errmsg").text("Please fillout everything.")
    } else {
      $("#errmsg").text("");
      $.post("/api/register", account, function(res) {
        console.log(res);
      });
    }
  });

  $(window).resize(() => {
    dropdownInstance.close();
    $(".sidenav").css("margin-top", $(".navbar-fixed").height());
    if ($(window).width() >= 992) {
      sideNavInstance.close();
    }
  });
});