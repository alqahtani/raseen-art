if (typeof jQuery == "undefined") {
  var script = document.createElement("script");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
  script.type = "text/javascript";
  document.head.insertBefore(script, document.head.firstChild);

  script.onload = function () {
    $ = jQuery;

    $(document).ready(function () {
      initiateChat();
    });
  };
} else {
  $ = jQuery;

  $(document).ready(function () {
    initiateChat();
  });
}

function initiateChat() {
  var scriptTag = document.querySelector('script[src*="jquery_extend_patch"]');
  var urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
  var tenant = urlParams.get("tenant");

  addCSS();
  createChatButton();
  createChatWindow();

  $(".style-div").click(function () {
    $(".style-div").removeClass("active");
    $(this).addClass("active");
  });
  $(".length-div").click(function () {
    $(".length-div").removeClass("active");
    $(this).addClass("active");
  });

  $(".layout-selector").click(function () {
    $(".layout-selector").removeClass("active");
    $(this).addClass("active");
  });

  $(".close-box").click(function () {
    $(".chat-box").addClass("hidden");
    $(".ibl-ai-mentor-web").addClass("closed");
  });

  $(".close-about-p").click(function () {
    $(".about_p_popup").removeClass("show");
    $(".chat-panel.active .content-2.r-hide").removeClass("hide");
  });

  $(".div-block-294").click(function () {
    $(this).parent().addClass("open");
    $(this).parent().next(".rel-answer").addClass("open");
  });

  $(".div-block-294-open").click(function () {
    $(this).parent().removeClass("open");
    $(this).parent().next(".rel-answer").removeClass("open");
  });

  $(".text-block-169").click(function () {
    $(".text-block-169").removeClass("active");
    $(this).addClass("active");
    let name = $(this).attr("data-name");
    $(".chat-panel").removeClass("active");
    $('.chat-panel[data-name="' + name + '"]').addClass("active");
    if ((name = "summarize")) {
      //add 1 second delay
      setTimeout(function () {
        typeWriter4();
      }, 1000);
    }
  });

  var is = 0;
  var txts =
    "Python is a high-level, interpreted programming language that is known for its simplicity, readability, and versatility. It was first released in 1991 by Guido van Rossum and has since become one of the most popular programming languages in the world. Python is often used in a variety of applications, including web development, scientific computing, artificial intelligence, data analysis, and automation.";
  var speeds = 20;
  function typeWriter4() {
    if (is < txts.length) {
      $(".text-block-187-sum")[0].innerHTML += txts.charAt(is);
      is++;
      speed = Math.floor(Math.random() * 15) + 1;
      setTimeout(typeWriter4, speeds);
    } else {
      $(".text-block-187-sum")[0].classList.add("no-after");
      $(".sources-sum").removeClass("hidden");
      $(".related-sum").removeClass("hidden");
    }
  }

  $(".accordion__title-2").click(function () {
    $(this).next(".accordion__content-wrap-2").toggleClass("show");
  });

  $(".accordion__title__faq-2").click(function () {
    $(this).next(".accordion__content-wrap").toggleClass("show");
  });

  $(".close-add-r").click(function () {
    $(".add_content_popup").removeClass("show");
    $(".r-hide").removeClass("h-hide");
  });

  $(".faq-question-bar-2").click(function () {
    $(this).hide();
    $(".faq-content-2")[0].style.height = "auto";
  });

  $(".link-options-train").click(function () {
    let name = $(this).attr("data-name");
    $(".link-options-train").each(function (index) {
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    $(".panel").each(function (index) {
      $(this).removeClass("active");
    });
    $(".panel[data-name=" + name + "]").addClass("active");
  });

  $(".add-r-w").click(function () {
    var name = $(this).attr("data-name");
    $(".block-url").removeClass("show");
    $(".block-url[data-name='" + name + "']").addClass("show");
  });

  $(".close-url").click(function () {
    var name = $(this).attr("data-name");
    $(".block-url[data-name='" + name + "']").removeClass("show");
  });

  $(".browse-computer, .resource-drop-down").click(function (event) {
    if (!$(event.target).is(".file-upload-train, .file-upload-train *")) {
      $(".file-upload-train").click();
    }
  });

  $(".w_about").click(function () {
    $(".chat-panel.active .content-2.r-hide").addClass("hide");
    $(".about_p_popup").addClass("show");
  });

  $(".ibl-ai-mentor-web").click(function () {
    $(".chat-box").toggleClass("hidden");
    $(this).toggleClass("closed");
  });

  $(".train-div").click(function () {
    $(".add_content_popup").addClass("show");
    $(".r-hide").addClass("h-hide");
  });

  //if focused on ask-input and enter is pressed
  $(".ask-input").keypress(function (e) {
    if (e.which == 13) {
      if ($(".ask-input").val() == "") {
        return;
      }
      $(".fire-f").click();
    }
  });

  //on fire click
  $(".div-block-305.fire-f").click(function (event) {
    if ($(".ask-input").val() == "") {
      return;
    }

    $(".chat-1").addClass("hidden");
    $(".chat-response").removeClass("hidden");

    $(".f_question").text($(".ask-input").val());

    var q = $(".ask-input").val();
    //if q is not null
    if (q != null) {
      var scriptTag = document.querySelector('script[src*="jquery.min.js"]');
      var urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
      var tenant = urlParams.get("tenant");
      $.ajax({
        type: "POST",
        url:
          "https://mentor.ibl.ai/" +
          "/wp-json/ibl-web-ai-mentor-theme/v1/ask-question",
        data: {
          question: q,
          tenant: tenant,
        },
        success: function (data) {
          let answer = data.answer;
          var i = 0;
          var txt = answer;
          var speed = 20;
          function typeWriter1() {
            $(".history").removeClass("hidden");
            if (i < txt.length) {
              $(".text-block-187")[0].innerHTML += txt.charAt(i);
              i++;
              speed = Math.floor(Math.random() * 15) + 1;
              setTimeout(typeWriter1, speed);
            } else {
              $(".text-block-187")[0].classList.add("no-after");
              $(".sources").removeClass("hidden");
              $(".related").removeClass("hidden");
              $(".reg").addClass("reg-show");
              typeWriter3(q);
            }
          }
          typeWriter1();
        },
        error: function (errorThrown) {},
      });
    }

    // function typeWriter2() {
    //   var y = 0;
    //   var txt2 = 'One of the most important concepts in quantum computing is superposition, which allows qubits to be in multiple states simultaneously.';
    //   setTimeout(function() {
    //     $('.text-block-187')[1].style.display = 'block';
    //     function type() {
    //       if (y < txt2.length) {
    //         $('.text-block-187')[1].innerHTML += txt2.charAt(y);
    //         y++;
    //         speed = Math.floor(Math.random() * 10) + 1;
    //         setTimeout(type, speed);
    //       } else {
    //         $('.text-block-187')[1].classList.add("no-after");
    //         $('.reg-btn').removeClass('hidden');
    //         $('.sources').removeClass('hidden')
    //         $('.related').removeClass('hidden');
    //         $('.reg').addClass('reg-show');
    // 	     typeWriter3();
    //       }
    //     }
    //     type();
    //   }, 10);
    // }

    // setTimeout(typeWriter1, 2000);
  });

  $(".text-block-169").click(function () {
    $(".text-block-169").removeClass("active");
    $(this).addClass("active");
    let name = $(this).attr("data-name");
    $(".chat-panel").removeClass("active");
    $('.chat-panel[data-name="' + name + '"]').addClass("active");
    if ((name = "summarize")) {
      //add 1 second delay
      setTimeout(function () {
        // typeWriter4();
      }, 1000);
    }
  });
}

function createChatButton() {
  var appDir = getAppDir();
  var div = document.createElement("div");
  div.className = "ibl-ai-mentor-web closed";
  div.innerHTML =
    `<img style="width:30px" src="` +
    appDir +
    `/img/logo.gif" alt="ibl-ai-mentor-web-logo">`;
  document.body.appendChild(div);
}

function createChatWindow() {
  var appDir = getAppDir();
  var div = document.createElement("div");
  var div = document.createElement("div");
  div.className = "ibl_mentor chat-box hidden";
  div.innerHTML =
    `
    <div class="div-block-272">
      <div class="text-block-167 new-chat-text">AI Mentor</div>
      <div class="div-block-185"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4d827e022223_dots.png" loading="lazy" alt="" class="image-109"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4d5455022226_maximize.png" loading="lazy" alt="" class="image-109 resize-img"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small close-box"></div>
    </div>
    <div class="div-block-52">
      <div class="div-block-275"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4d421f02221a_comment.png" loading="lazy" alt="" class="image-45">
        <div data-name="chat" class="text-block-169 active">Chat</div>
      </div>
      <div class="div-block-275">
        <div data-name="summarize" class="text-block-169">Summarize</div>
      </div>
      <div class="div-block-275">
        <div data-name="create" class="text-block-169">Create</div>
      </div>
      <div class="div-block-275">
        <div data-name="train" class="text-block-169">Train</div>
      </div>
    </div>
    <div class="div-block-276 first">
      <div data-name="chat" class="chat-panel active">
        <div class="chat-1">
          <div class="content-2">
            <div class="mob-grid">
              <div id="w-node-ece2f8b8-495c-6eed-3fb6-5561df0fc7b1-ad84ccac" class="div-block-318"><img src="` +
    appDir +
    `img/edit.png" loading="lazy" alt="" class="image-80 f">
                <div class="text-block-186">Ask Me Anything</div>
              </div>
              <div id="w-node-ece2f8b8-495c-6eed-3fb6-5561df0fc7b5-ad84ccac" class="div-block-319 q">
                <div class="text-block-184"><em>"Explain quantum computing in simple terms"</em></div>
              </div>
              <div id="w-node-_62edb863-eea9-733b-c4c5-0d14fa050fc3-ad84ccac" class="div-block-319 q">
                <div class="text-block-184"><em>"Explain the concept of big data and how it is changing industries"</em></div>
              </div>
              <div id="w-node-_66d1bce1-6467-085b-6ac6-25c07af09eaa-ad84ccac" class="div-block-319 q">
                <div class="text-block-184"><em>"What is the difference between cloud computing and traditional computing?"</em></div>
              </div>
            </div>
          </div>
          <div class="chat-2">
            <div class="form-block-8">
              <div>
                <div class="div-block-307"><input type="text" autocomplete="off" class="text-field-11 ask-input w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="Ask me anything..." id="name-2">
                  <a href="#" class="link-block-22 ask-submit w-inline-block">
                    <div class="div-block-305 fire-f"><img src="` +
    appDir +
    `img/navigation.png" loading="lazy" alt="" class="image-14"></div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="chat-response hidden">
          <div class="all">
            <div class="grow-flex">
              <div class="div-block-278">
                <div class="rep-div">
                  <div class="div-block-279"><img src="` +
    appDir +
    `img/user.png" loading="lazy" alt="" class="image-25"></div>
                  <div class="f_question"></div>
                </div>
              </div>
              <div class="div-block-278 bot-rep">
                <div class="rep-div bot-rep">
                  <div class="div-block-279 bot-gb"><img src="` +
    appDir +
    `img/abstract.png" loading="lazy" alt="" class="image-25 bot-img"></div>
                  <div class="div-block-281">
                    <div class="text-block-187"></div>
                    <div class="text-block-187 mg-t hidden"></div>
                    <div class="sources hidden">
                      <div class="text-block-104">Learn more:</div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">1. en.wikipedia.org</div>
                        </a>
                      </div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">2. investopedia.com</div>
                        </a>
                      </div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">3. ibm.com</div>
                        </a>
                      </div>
                    </div>
                    <div class="related hidden">
                      <div class="text-block-171">Related:</div>
                      <div class="rel-row">
                        <div class="text-block-192">Ways to make a difference</div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">One &nbsp;way to make a difference is by practicing kindness in your daily interactions with others. This could be as simple as holding the door open for someone, offering a smile or compliment, or lending a listening ear to a friend or stranger. Small acts of kindness can have a ripple effect and contribute to a more positive and compassionate world.</div>
                      </div>
                      <div class="rel-row sec">
                        <div class="text-block-192">How to help the environment</div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">To help the environment, there are many things we can do in our daily lives. One of the most important is to reduce our waste by using reusable bags, containers, and water bottles, and recycling whenever possible.</div>
                      </div>
                      <div class="rel-row sec">
                        <div class="text-block-192">Volunteer opportunities </div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">One of the most popular volunteer opportunities is in environmental organizations, where volunteers can help with tasks such as cleaning up litter, planting trees, and conducting environmental research.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="div-block-325">
              <div class="div-block-280">
                <a href="#" class="link-block-20 w-inline-block">
                  <div class="reg-btn hidden">
                    <div class="text-block-150">Regenerate Response</div>
                  </div>
                </a>
              </div>
              <div class="form-block-8">
                <div id="email-form-4" name="email-form-4" data-name="Email Form 4" method="get" class="form-2 ns f">
                  <div class="div-block-324"><input type="text" autocomplete="off" class="text-field-11 ask-input2 w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2">
                    <a href="#" class="link-block-22 ask-submit-follow-up w-inline-block">
                      <div class="div-block-305"><img loading="lazy" src="` +
    appDir +
    `img/navigation.png" alt="" class="image-14"></div>
                    </a>
                  </div>
                  <div class="reg"><img loading="lazy" src="` +
    appDir +
    `img/refresh-copy.png" alt="" class="image-113"></div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-name="summarize" class="chat-panel">
        <div class="summarize-response">
          <div class="all">
            <div class="grow-flex">
              <div class="div-block-278">
                <div class="rep-div">
                  <div class="div-block-279"><img src="` +
    appDir +
    `img/user.png" loading="lazy" alt="" class="image-25"></div>
                  <div>Summarize <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank" class="link-9">Wikipedia Python</a><br></div>
                </div>
              </div>
              <div class="div-block-278 bot-rep">
                <div class="rep-div bot-rep">
                  <div class="div-block-279 bot-gb"><img src="` +
    appDir +
    `img/abstract.png" loading="lazy" alt="" class="image-25 bot-img"></div>
                  <div class="div-block-281">
                    <div class="text-block-187-sum"></div>
                    <div class="sources-sum hidden">
                      <div class="text-block-104">Learn more:</div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">1. en.wikipedia.org</div>
                        </a>
                      </div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">2. investopedia.com</div>
                        </a>
                      </div>
                      <div>
                        <a href="#" class="link-block-21 w-inline-block">
                          <div class="text-block-172">3. ibm.com</div>
                        </a>
                      </div>
                    </div>
                    <div class="related-sum hidden">
                      <div class="text-block-171">Related:</div>
                      <div class="rel-row">
                        <div class="text-block-192">What is the latest version of Python?</div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">The latest version of Python is Python 3.10.0 as of September 2021.</div>
                      </div>
                      <div class="rel-row sec">
                        <div class="text-block-192">What is a tuple in Python?<br></div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">A tuple in Python is a collection of ordered, immutable elements that can include various data types, such as integers, strings, and even other tuples</div>
                      </div>
                      <div class="rel-row sec">
                        <div class="text-block-192">What are the main data types in Python?</div>
                        <div class="div-block-294-open"><img src="` +
    appDir +
    `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src="` +
    appDir +
    `img/delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div>
                        <div class="div-block-294"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-116"><img src="` +
    appDir +
    `img/plus.png" loading="lazy" alt="" class="image-93-rot"></div>
                      </div>
                      <div class="rel-answer">
                        <div class="answer-text">The main data types in Python include numeric, boolean, string, list, tuple, set, and dictionary.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="summarize hidden">
          <div class="content-2 sum-content">
            <div>
              <div class="div-block-334 t">
                <div class="text-block-194">Title:</div>
                <div class="text-block-195"> IBL Skills</div>
              </div>
              <div class="text-block-193">This page provides information and resources for training programs, which aims to help individuals and organizations develop key competencies in innovation, business, and leadership. The page offers a variety of learning materials such as videos, articles, and case studies, as well as tools and templates to support participants in applying the skills and concepts covered in the training. Overall, the website serves as a hub for information and resources related to training programs</div>
              <ul role="list" class="list-2">
                <li class="list-item">
                  <div>Offers learning materials such as videos, articles, and case studies</div>
                </li>
                <li class="list-item">
                  <div>Provides tools and templates to support the application of skills and concepts covered in the training</div>
                </li>
                <li class="list-item">
                  <div>Offers opportunities to connect with others in the IBL community and access mentorship and coaching services</div>
                </li>
                <li class="list-item">
                  <div>Serves as a hub for information and resources related to training programs</div>
                </li>
              </ul>
              <div class="sum-sources">
                <div class="text-block-104">Learn more:</div>
                <div>
                  <a href="#" class="link-block-21 w-inline-block">
                    <div class="text-block-172">1. en.wikipedia.org</div>
                  </a>
                </div>
                <div>
                  <a href="#" class="link-block-21 w-inline-block">
                    <div class="text-block-172">2. investopedia.com</div>
                  </a>
                </div>
                <div>
                  <a href="#" class="link-block-21 w-inline-block">
                    <div class="text-block-172">3. ibm.com</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-name="create" class="chat-panel">
        <div class="content-2">
          <div class="div-block-327">
            <div class="create-div">
              <div class="text-block-189">Create</div>
              <div class="form-block-9">
                <div id="email-form-5" name="email-form-5" data-name="Email Form 5" method="get" aria-label="Email Form 5"><textarea placeholder="What do you want to create?" maxlength="5000" id="field" name="field" data-name="Field" class="textarea-2 w-input"></textarea></div>


              </div>
              <div class="create-button">
                <div class="c-btn copy-btn"><img src="` +
    appDir +
    `img/link-copy.png" loading="lazy"  alt="" class="image-114">
                  <div class="w_i">Copy</div>
                </div>
                <div class="c-btn"><img src="` +
    appDir +
    `img/share-copy.png" loading="lazy" alt="" class="image-114">
                  <div class="w_i">Share</div>
                </div>
              </div>
            </div>
            <div class="create-div">
              <div class="div-block-328"><img src="` +
    appDir +
    `img/pen-copy.png" loading="lazy"  alt="" class="image-114">
                <div class="w_i">Style</div>
              </div>
              <div>
                <div class="style-div active">
                  <div class="text-block-190">Formal</div>
                </div>
                <div class="style-div">
                  <div class="text-block-190">Conversational</div>
                </div>
                <div class="style-div">
                  <div class="text-block-190">Energetic</div>
                </div>
                <div class="style-div">
                  <div class="text-block-190">Educational</div>
                </div>
                <div class="style-div">
                  <div class="text-block-190">Humorous</div>
                </div>
              </div>
            </div>
            <div class="create-div">
              <div class="div-block-328"><img src="` +
    appDir +
    `img/document-copy.png" loading="lazy"  alt="" class="image-114">
                <div class="w_i">Layout</div>
              </div>
              <div class="div-block-329">
                <div class="layout-div">
                  <div class="layout-selector active"><img src="` +
    appDir +
    `img/menu-bar-copy.png" loading="lazy"  alt="" class="image-115"></div>
                  <div class="text-block-191">Text</div>
                </div>
                <div class="layout-div">
                  <div class="layout-selector"><img src="` +
    appDir +
    `img/envelope-copy.png" loading="lazy" alt="" class="image-115"></div>
                  <div class="text-block-191">Email</div>
                </div>
                <div class="layout-div">
                  <div class="layout-selector"><img src="` +
    appDir +
    `img/text-format-copy.png" loading="lazy"  alt="" class="image-115"></div>
                  <div class="text-block-191">Article</div>
                </div>
                <div class="layout-div">
                  <div class="layout-selector"><img src="` +
    appDir +
    `img/list-copy.png" loading="lazy" alt="" class="image-115"></div>
                  <div class="text-block-191">List</div>
                </div>
              </div>
            </div>
            <div class="create-div">
              <div class="div-block-328"><img src="` +
    appDir +
    `img/menu-bar-copy.png" loading="lazy"  alt="" class="image-114">
                <div class="w_i">Size</div>
              </div>
              <div>
                <div class="length-div">
                  <div class="text-block-190">Concise</div>
                </div>
                <div class="length-div active">
                  <div class="text-block-190">Regular</div>
                </div>
                <div class="length-div">
                  <div class="text-block-190">Extended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-2">
          <div class="create-btn active">
            <div class="create-text">Create</div>
          </div>
        </div>
      </div>
      <div data-name="train" class="chat-panel">
        <div data-name="followers" class="add_content_popup">
          <div class="div-block-333">
            <div class="div-block-272-add-c">
              <div class="text-block-167 add-resource">Add Resource</div>
              <div class="div-block-185"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small close-add-r"></div>
            </div>

            <div class="div-block-345">
              <div class="div-block-348">
                <div class="w-embed">
                  <form action="/action_page.php">
                    <input type="file" class="file-upload-train" id="myFile" name="filename">
                    <input type="submit">
                  </form>
                </div>
              </div>
              <div class="div-block-347">
                <a href="#" class="b-link browse-computer">Browse Files</a>
                <div>
                  <a data-name="url" href="#" class="b-link add-r-w">From URL</a>
                  <a data-name="resource" href="#" class="b-link last add-r-w">Find Resource</a>
                </div>
              </div>
              <div class="resource-drop-down">
                <div class="div-block-346"><img src="` +
    appDir +
    `img/inbox-copy.png" loading="lazy" alt="" class="image-121">
                  <div class="text-block-199">Add PDF</div>
                </div>
              </div>
            </div>
          </div>
          <div class="create-btn active add_res hide">
            <div class="create-text">Add Resource</div>
          </div>
          <div data-name="type" class="conent_panel">
            <div class="div-block-148 cr_res">
              <div class="type_grid">
                <div class="div-block-176"><img src="` +
    appDir +
    `img/document_1document.png" loading="lazy" alt="" class="image-80">
                  <div class="text-block-111">Article</div>
                </div>
                <div class="div-block-176"><img src="` +
    appDir +
    `img/book_2book.png" loading="lazy" alt="" class="image-80">
                  <div class="text-block-111">Book</div>
                </div>
                <div class="div-block-176"><img src="` +
    appDir +
    `img/test_1test.png" loading="lazy" alt="" class="image-80">
                  <div class="text-block-111">Assesment</div>
                </div>
                <div class="div-block-176"><img src="` +
    appDir +
    `img/audio-speaker.png" loading="lazy"  alt="" class="image-80">
                  <div class="text-block-111">Podcast</div>
                </div>
                <div class="div-block-176"><img src="` +
    appDir +
    `img/b.png" loading="lazy" alt="" class="image-80">
                  <div class="text-block-111">Course</div>
                </div>
                <div class="div-block-176"><img src="` +
    appDir +
    `img/cm_1cm.png" loading="lazy" alt="" class="image-80 cam">
                  <div class="text-block-111">Video</div>
                </div>
              </div>
            </div>
          </div>
          <div data-name="url" class="div-block-349 block-url">
            <div class="create-div">
              <div class="div-block-328"><img src="` +
    appDir +
    `img/link-copy.png" loading="lazy" alt="" class="image-114">
                <div class="w_i">From URL</div>
                <div class="div-block-185 mgr-auto"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" data-name="url" alt="" class="image-109 small close-url"></div>
              </div>
              <div>
                <div class="form-block-10 ">
                  <div id="email-form-6" name="email-form-6" data-name="Email Form 6" method="get" aria-label="Email Form 6"><input type="text" class="text-field-12 w-input" maxlength="256" name="name-3" data-name="Name 3" placeholder="" id="name-3"></div>


                </div>
              </div>
              <div class="create-btn active url-btn">
                <div class="create-text">Add Resource</div>
              </div>
            </div>
          </div>
          <div data-name="resource" class="div-block-349 block-url">
            <div class="create-div">
              <div class="div-block-328"><img src="` +
    appDir +
    `img/63fdf140d3e5fbe3d61c7a1e_magnifying-glass.png" loading="lazy" alt="" class="image-114">
                <div class="w_i">Find Resource</div>
                <div class="div-block-185 mgr-auto"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" data-name="resource" alt="" class="image-109 small close-url"></div>
              </div>
              <div class="form-block s_skill r-search res-s">
                <div id="email-form" name="email-form" data-name="Email Form" method="get" class="form s-f" aria-label="Email Form">
                  <div class="div-block"><img src="` +
    appDir +
    `img/63fdf140d3e5fbe3d61c7a1e_magnifying-glass.png" loading="lazy" alt="" class="image-2"></div><input type="email" class="text-field n_text s-f w-input" maxlength="256" name="email-4" data-name="Email 4" placeholder="Search for Resource" id="email-4" required="">
                </div>


              </div>
              <div class="cred_res mgt-10">
                <div class="rec-div">
                  <div class="div-block-330"><img src="` +
    appDir +
    `img/6123cb8af7e1074989c91721_course2.jpeg" loading="lazy" alt="" class="rec-img">
                    <div class="label c rec">
                      <div class="text-block-124">COURSE</div>
                    </div>
                  </div>
                  <div class="div-block-331">
                    <div class="rec-h">Python for Data Science, AI &amp; Development</div>
                    <div class="div-block-23 p">
                      <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/ibm.png" loading="lazy" alt="" class="image-18 rec"></div>
                      <div class="text-block-16 p">IBM</div>
                    </div>
                  </div>
                </div>
                <div class="rec-div">
                  <div class="div-block-330"><img src="` +
    appDir +
    `img/6123cb8af7e107592dc916d3_course4.jpeg" loading="lazy"  alt="" class="rec-img">
                    <div class="label c rec">
                      <div class="text-block-124">COURSE</div>
                    </div>
                  </div>
                  <div class="div-block-331">
                    <div class="rec-h">Python for Data Science, AI &amp; Development</div>
                    <div class="div-block-23 p">
                      <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/ibm.png" loading="lazy" alt="" class="image-18 rec"></div>
                      <div class="text-block-16 p">IBM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-name="followers" class="about_p_popup">
          <div class="div-block-333">
            <div class="div-block-272-add-c">
              <div class="text-block-167 add-resource">Python for Data Science, AI &amp; Development</div>
              <div class="div-block-185"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small close-about-p"></div>
            </div>
            <div class="about-box-train">
              <div class="div-block-264-train">
                <div class="div-block-344-train">
                  <div class="text-block-159-train">Python for Data Science</div>
                  <div class="div-block-337">
                    <div class="div-block-125 ins"><img src="` +
    appDir +
    `img/warren-wong-VVEwJJRRHgk-unsplash.jpeg" alt="" class="image-117"></div>
                    <div class="div-block-137">
                      <div class="text-block-196">Eliott Hanson</div>
                    </div>
                  </div>
                </div>
                <div class="div-block-336-train">
                  <div class="text-block-198">Offered By</div><img src="` +
    appDir +
    `img/log_d.png" loading="lazy" alt="" class="image-105">
                </div>
              </div>
            </div>
            <div class="about-box-train">
              <div class="div-block-338">
                <div class="vid-header-train w-clearfix">
                  <div style="padding-top:56.17021276595745%" class="video-2 w-video w-embed"><iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FrfscVS0vtbw%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrfscVS0vtbw&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FrfscVS0vtbw%2Fhqdefault.jpg&amp;key=96f1f04c5f4143bcb0f2e68c87d65feb&amp;type=text%2Fhtml&amp;schema=youtube" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe></div>
                  <a href="#" class="button-3 hide w-button">Enroll</a>
                </div>
                <div class="div-block-263">
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/coin_1coin.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">$120</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/language_1language.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">English</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/certificate_1certificate.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">Certificate</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/clock_3clock.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">2 Months</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/date_1date.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">9th Jan, 2023</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/63b5a1e8664d9617e9b5018f_level_icon_163b5a1e8664d9617e9b5018f_level_icon.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">Beginner</div>
                  </div>
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/cc_1cc.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">Arabic, French, Portuguese, Italian, German, Russian, English, Spanish, Korean, Japanese</div>
                  </div>
                  <div class="div-block-262 last">
                    <div class="div-block-258"><img src="` +
    appDir +
    `img/share_4share.png" alt="" class="skills-about-icon">
                      <div class="text-block-160">Share this course</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="about-box-train">
              <div class="options-3">
                <div class="div-block-340-train">
                  <div data-name="about" class="link-options-train link-options active">About</div>
                  <div data-name="instructors" class="link-options-train link-options">Instructors</div>
                  <div data-name="syllabus" class="link-options-train link-options">Syllabus</div>
                  <div data-name="reviews" class="link-options-train link-options">Reviews</div>
                  <div data-name="faq" class="link-options-train">FAQ</div>
                </div>
              </div>
              <div class="panels-2">
                <div data-name="about" class="panel active">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">About this Course<br></div>
                    <div class="text1-tr">This course covers foundational data science tools and techniques, including getting, cleaning, and exploring data, programming in Python, and conducting reproducible research.<br></div>
                    <div class="faq-question-wrap-2">
                      <a data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad299" href="#" class="faq-question-bar-2 w-inline-block">
                        <div class="div-block-126">
                          <div class="question-title-te">Show all</div>
                        </div>
                      </a>
                      <div class="faq-content-2" style="height: 0px;">
                        <p class="paragraph-tr">The five courses in this specialization are the very same courses that make up the first half of the Data Science Specialization. This specialization is presented for learners who want to start and complete the foundational part of the curriculum first, before moving onto the more advanced topics in Data Science: Statistics and Machine Learning.</p>
                      </div>
                    </div>
                    <div>
                      <div class="div-block-270">
                        <div class="text-block-163-tr">WHAT YOU WILL LEARN</div>
                        <div class="outcome-train">
                          <div class="first">
                            <div class="outcome-row">
                              <div class="img-2"><img src="` +
    appDir +
    `img/tick.png" alt="" class="image-118-tr"></div>
                              <div class="outcome-value">
                                <div class="text-block-86-tr">Use Python to clean, analyze and visualize data.</div>
                              </div>
                            </div>
                            <div class="outcome-row">
                              <div class="img-2"><img src="` +
    appDir +
    `img/tick.png" alt="" class="image-118-tr"></div>
                              <div class="outcome-value">
                                <div class="text-block-86-tr">Use GitHub to manage data science projects.<br></div>
                              </div>
                            </div>
                          </div>
                          <div class="second-train">
                            <div class="outcome-row">
                              <div class="img-2"><img src="` +
    appDir +
    `img/tick.png" alt="" class="image-118"></div>
                              <div class="outcome-value">
                                <div class="text-block-86-tr">Learn how to ask the right questions, obtain data,</div>
                              </div>
                            </div>
                            <div class="outcome-row">
                              <div class="img-2"><img src="` +
    appDir +
    `img/tick.png" alt="" class="image-118"></div>
                              <div class="outcome-value">
                                <div class="text-block-86-tr">Set up Python, Github and other useful tools</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="skills">
                          <div class="text-block-163-tr">SKILLS YOU WILL GAIN</div>
                          <div class="outcome-train">
                            <div class="skill-div-2">
                              <div class="text-block-86-tr">Python</div>
                            </div>
                            <div class="skill-div-2">
                              <div class="text-block-86-tr">Machine Learning</div>
                            </div>
                            <div class="skill-div-2">
                              <div class="text-block-86-tr">GitHub</div>
                            </div>
                            <div class="skill-div-2">
                              <div class="text-block-86-tr">Exploratory Data Analysis</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="instructors" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-train">Instructors<br></div>
                    <div class="instructor-block-train">
                      <div class="inst-block-train"><img src="` +
    appDir +
    `img/warren-wong-VVEwJJRRHgk-unsplash.jpeg" alt="" class="instructor-img-train">
                        <div class="div-block-339-train">
                          <div class="instructor-name-train"> Eliott Hanson, Phd</div>
                          <div class="instructor-subtitle-train">Computer Science Professor</div>
                          <div class="instructor-school-train">School of Computer Science</div>
                        </div>
                      </div>
                      <div class="inst-block-train sec"><img src="` +
    appDir +
    `img/t6.jpeg" alt="" class="instructor-img-train">
                        <div class="div-block-339-train">
                          <div class="instructor-name-train">Jean Long</div>
                          <div class="instructor-subtitle-train">Computer Science Professor</div>
                          <div class="instructor-school-train">School of Computer Science</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="syllabus" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Syllabus<br></div>
                    <div data-ix="fade-up-1" class="accordion js-accordion">
                      <div class="accordion-item-3 f">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad2ef" class="accordion__title-2">
                          <div class="text-block-26">Introduction</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Welcome to Introduction to Data Science with Python!</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Syllabus Quiz (8 Questions)</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Important Pre-Course Survey</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad30c" class="accordion__title-2">
                          <div class="text-block-26">Section 1: Linear Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.1 Introduction to Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.2 Error Evaluation and Model Comparison</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.3 Linear Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad330" class="accordion__title-2">
                          <div class="text-block-26">Section 2: Multiple and Polynomial Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">2.1 Multiple Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">2.2 Techniques for Multilinear Modeling</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">2.3 Polynomial Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad354" class="accordion__title-2">
                          <div class="text-block-26">Section 3: Model Selection and Cross-Validation</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">3.1 Model Selection</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">3.2 Cross-Validation</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad371" class="accordion__title-2">
                          <div class="text-block-26">Section 4: Bias, Variance, and Hyperparameters</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">4.1 Introductory Exercise</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">4.2 Bias and Variance</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">4.3 Ridge and LASSO</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad395" class="accordion__title-2">
                          <div class="text-block-26">Section 5: Classification and Logistic Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">5.1 Classification and kNN</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">5.2 Logistic Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad3b2" class="accordion__title-2">
                          <div class="text-block-26">Section 6: Multi-logstic Regression and Missingness</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">6.1 Multinomial Logistic Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">6.2 Missingness</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad3cf" class="accordion__title-2">
                          <div class="text-block-26">Section 7: Bootstrap, Confidence Intervals, and Hypothesis Testing</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">7.1 Inference in Linear Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">7.2 Bootstrap and Confidence Intervals</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">7.3 Evaluating Predictor Significance</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad3f3" class="accordion__title-2">
                          <div class="text-block-26">Section 8: Capstone Project</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">No Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">8.1 Introduction</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">8.2 Why is accuracy not enough?</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">8.3 Bayes Threshold</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad417" class="accordion__title-2 last">
                          <div class="text-block-26">Wrap-up</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Important post-course surveys</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Review Videos</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Week 3</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Final Notes</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="reviews" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Reviews<br></div>
                    <div data-delay="4000" data-animation="slide" class="slider-5  w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true" role="region" aria-label="carousel">
                      <div class="w-slider-mask" id="w-slider-mask-7"><div class="w-slide" aria-label="1 of 1" role="group" style="transform: translateX(0px); opacity: 1;">
                          <div class="div-block-341 train">
                            <div class="div-block-139 test-block x train">
                              <div class="image_author-3"><img src="` +
    appDir +
    `img/636cf1dea11595d85363c94e_74.jpeg" alt="" class="image-119">
                                <div class="test-name-3">Inez Sierra</div>
                              </div>
                              <div class="test-text-2">
                                <div class="text-block-86">"It has been an amazing journey. I learnt a lot from it and I will go through different topics especially, functions and OOPS to have a better understanding."</div>
                              </div>
                            </div>
                          </div>
                        </div><div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore=""></div></div>
                      <div class="left-arrow-6 w-slider-arrow-left" role="button" tabindex="0" aria-controls="w-slider-mask-7" aria-label="previous slide" style="display: none;"><img src="` +
    appDir +
    `img/back.svg" alt="" class="image-120"></div>
                      <div class="right-arrow-6 w-slider-arrow-right" role="button" tabindex="0" aria-controls="w-slider-mask-7" aria-label="next slide" style="display: none;"><img src="` +
    appDir +
    `img/next.svg" alt="" class="image-ra-2"></div>
                    </div>

                  </div>
                </div>
                <div data-name="faq" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Frequently Asked Questions<br></div>
                    <div data-ix="fade-up-1" class="accordion js-accordion">
                      <div class="accordion-item-2">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad48c" class="accordion__title__faq-2 first">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">When will I have access to the lectures and assignments?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2 last">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">Once you enroll for a Certificate, you’ll have access to all videos, quizzes, and programming assignments (if applicable). Peer review assignments can only be submitted and reviewed once your session has begun. If you choose to explore the course without purchasing, you may not be able to access certain assignments.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-2">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad498" class="accordion__title__faq-2">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">What will I get if I subscribe to this Specialization?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">When you enroll in the course, you get access to all of the courses in the Specialization, and you earn a certificate when you complete the work. Your electronic Certificate will be added to your Accomplishments page - from there, you can print your Certificate or add it to your LinkedIn profile. If you only want to read and view the course content, you can audit the course for free.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-2">
                        <div data-w-id="fbb2ebdb-0481-4c88-9c6c-4381502ad4a4" class="accordion__title__faq-2">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">What are the requirements to attend this course?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2 last">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">Access to a computer with an internet connection.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-2 r-hide">
          <div class="div-block-327">
            <div class="div-block-335">
              <div class="train-div"><img src="` +
    appDir +
    `img/63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus_163efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="content-plush">
                <div class="add-text">Train Mentor with Resource</div>
              </div>
              <div class="rec-div w_about">
                <div class="div-block-330"><img src="` +
    appDir +
    `img/6123cb8af7e1074325c916c6_c11.jpeg" loading="lazy" alt="" class="rec-img">
                  <div class="label c rec">
                    <div class="text-block-124">COURSE</div>
                  </div>
                </div>
                <div class="div-block-331">
                  <div class="rec-h">Python for Data Science, AI &amp; Development</div>
                  <div class="div-block-23 p">
                    <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/ibm.png" loading="lazy" alt="" class="image-18 rec"></div>
                    <div class="text-block-16 p">IBM</div>
                  </div>
                  <div class="div-block-332"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small remove-resource"></div>
                </div>
              </div>
              <div class="rec-div w_about">
                <div class="div-block-330"><img src="` +
    appDir +
    `img/6123cb8af7e1074989c91721_course2.jpeg" loading="lazy"  alt="" class="rec-img">
                  <div class="label rec">
                    <div class="text-block-124">PATHWAY</div>
                  </div>
                </div>
                <div class="div-block-331">
                  <div class="rec-h">Machine Learning Foundations</div>
                  <div class="div-block-23 p">
                    <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/google.png" loading="lazy"  alt="" class="image-18 rec"></div>
                    <div class="text-block-16 p">Google</div>
                  </div>
                  <div class="div-block-332"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small remove-resource"></div>
                </div>
              </div>
              <div class="rec-div w_about">
                <div class="div-block-330"><img src="` +
    appDir +
    `img/60fe91c1fcf26f99f44d8b6c_3.jpeg" loading="lazy" alt="" class="rec-img">
                  <div class="label o rec">
                    <div class="text-block-124">VIDEO</div>
                  </div>
                </div>
                <div class="div-block-331">
                  <div class="rec-h">Introduction to Artificial Intelligence</div>
                  <div class="div-block-23 p">
                    <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/Stanford_Coursera_Logo.png" loading="lazy" alt="" class="image-18 rec"></div>
                    <div class="text-block-16 p">Stanford University</div>
                  </div>
                  <div class="div-block-332"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small remove-resource"></div>
                </div>
              </div>
              <div class="rec-div w_about">
                <div class="div-block-330"><img src="` +
    appDir +
    `img/c10.jpeg" loading="lazy" alt="" class="rec-img">
                  <div class="label c rec">
                    <div class="text-block-124">COURSE</div>
                  </div>
                </div>
                <div class="div-block-331">
                  <div class="rec-h">Advanced Python for Machine Learning</div>
                  <div class="div-block-23 p">
                    <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/google.png" loading="lazy"  alt="" class="image-18 rec"></div>
                    <div class="text-block-16 p">Google</div>
                  </div>
                  <div class="div-block-332"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small remove-resource"></div>
                </div>
              </div>
              <div class="rec-div w_about">
                <div class="div-block-330"><img src="` +
    appDir +
    `img/6123cb8af7e1077407c91720_course3.jpeg" loading="lazy"  alt="" class="rec-img">
                  <div class="label rec">
                    <div class="text-block-124">PATHWAY</div>
                  </div>
                </div>
                <div class="div-block-331">
                  <div class="rec-h">Data Visualization with Javascript</div>
                  <div class="div-block-23 p">
                    <div class="div-block-24 rec"><img src="` +
    appDir +
    `img/ibm.png" loading="lazy" alt="" class="image-18 rec"></div>
                    <div class="text-block-16 p">IBM</div>
                  </div>
                  <div class="div-block-332"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small remove-resource"></div>
                </div>
              </div>
              <div class="resource-div hidden">
                <a href="#" class="res_link w-inline-block">
                  <div class="rec-header"><img src="` +
    appDir +
    `img/c8.jpeg" height="30"  alt="" class="image-34-wide">
                    <div class="unit_type_div w-clearfix"><img src="` +
    appDir +
    `img/docs.png" loading="lazy" alt="" class="type_img">
                      <div class="text-block-52">Document</div>
                    </div>
                  </div>
                  <div class="course-body-4-wide">
                    <div class="unit-wide-header-holder">
                      <div class="text-block-39 wide">Jupyter notebooks<br></div>
                      <div class="div-block-23 p">
                        <div class="div-block-24"><img src="` +
    appDir +
    `img/ibm.png" loading="lazy" alt="" class="image-18"></div>
                        <div class="text-block-16 p">IBM</div>
                      </div>
                      <div class="unit-wide-description">Machine learning is the science of getting computers to act without being explicitly programmed.</div>
                    </div>
                    <div class="line4 n t"></div>
                    <div class="course-features">
                      <div class="div-block-74 first_row wide">
                        <div class="div-block-73 wide">
                          <div class="faq-wrap-3"><img src="` +
    appDir +
    `img/volume.png"  alt="" class="img-trg-4"></div>
                          <div class="features_block-2">
                            <div class="features-title-5">Introductory</div>
                          </div>
                        </div>
                        <div class="div-block-73 wide">
                          <div class="faq-wrap-3"><img src="` +
    appDir +
    `img/clock.png"  alt="" class="img-trg-4"></div>
                          <div class="features_block-2">
                            <div class="features-title-5">20 Minutes</div>
                          </div>
                        </div>
                        <div class="div-block-73 wide">
                          <div class="faq-wrap-3 top_c"><img src="` +
    appDir +
    `img/checked.png" alt="" class="img-trg-4"></div>
                          <div class="features_block-2">
                            <div class="features-title-5">0.28 pts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="form-block s_skill r-search s-r">
              <div id="email-form" name="email-form" data-name="Email Form" method="get" class="form s-f" aria-label="Email Form">
                <div class="div-block"><img src="` +
    appDir +
    `img/63fdf140d3e5fbe3d61c7a1e_magnifying-glass.png" loading="lazy" alt="" class="image-2"></div><input type="email" class="text-field n_text s-f w-input" maxlength="256" name="email-4" data-name="Email 4" placeholder="Search for Resource" id="email-4" required="">
              </div>


            </div>
          </div>
        </div>
        <div data-name="followers" class="about_p_popup_resource">
          <div class="div-block-333">
            <div class="div-block-272-add-c">
              <div class="text-block-167 add-resource">Python for Beginners</div>
              <div class="div-block-185"><img src="https://uploads-ssl.webflow.com/639a0b1d608b70f9f7e28181/63fceb62ef5b4dc10a022221_close.png" loading="lazy" alt="" class="image-109 small close-about-p"></div>
            </div>
            <div class="about-box-train">
              <div class="div-block-264-train">
                <div class="div-block-344-train">
                  <div class="text-block-159-train">Python for Beginners</div>
                  <div class="div-block-337">
                    <div class="div-block-125 ins"><img src="` +
    appDir +
    `img/warren-wong-VVEwJJRRHgk-unsplash.jpeg" alt="" class="image-117"></div>
                    <div class="div-block-137">
                      <div class="text-block-196">Eliott Hanson</div>
                    </div>
                  </div>
                </div>
                <div class="div-block-336-train">
                  <div class="text-block-198">Offered By</div><img src="` +
    appDir +
    `img/New-Block-M-Stacked-Blue-295C_600x600.png" loading="lazy" alt="" class="image-105 ob">
                </div>
              </div>
            </div>
            <div class="about-box-train">
              <div class="div-block-338">
                <div class="vid-header-train w-clearfix">
                  <div style="padding-top:56.17021276595745%" class="video-2 w-video w-embed"><iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FrfscVS0vtbw%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrfscVS0vtbw&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FrfscVS0vtbw%2Fhqdefault.jpg&amp;key=96f1f04c5f4143bcb0f2e68c87d65feb&amp;type=text%2Fhtml&amp;schema=youtube" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe></div>
                  <a href="#" class="button-3 hide w-button">Enroll</a>
                </div>
                <div class="div-block-263">
                  <div class="div-block-262"><img src="` +
    appDir +
    `img/clock_3clock.png" alt="" class="skills-about-icon">
                    <div class="text-block-160">20 Minutes</div>
                  </div>
                  <div class="div-block-262 last">
                    <div class="div-block-258"><img src="` +
    appDir +
    `img/share_4share.png" alt="" class="skills-about-icon">
                      <div class="text-block-160 view_this_r">View this Video</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="about-box-train">
              <div class="panels-2">
                <div data-name="about" class="panel active mg-t0">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">About this Video<br></div>
                    <div class="text1-tr">This video covers foundational data science tools and techniques, including getting, cleaning, and exploring data, programming in Python, and conducting reproducible research.<br></div>
                    <div class="faq-question-wrap-2">
                      <a data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ad4f" href="#" class="faq-question-bar-2 w-inline-block">
                        <div class="div-block-126">
                          <div class="question-title-te">Show all</div>
                        </div>
                      </a>
                      <div class="faq-content-2" style="height: 0px;">
                        <p class="paragraph-tr">The five courses in this specialization are the very same courses that make up the first half of the Data Science Specialization. This specialization is presented for learners who want to start and complete the foundational part of the curriculum first, before moving onto the more advanced topics in Data Science: Statistics and Machine Learning.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="instructors" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-train">Instructors<br></div>
                    <div class="instructor-block-train">
                      <div class="inst-block-train"><img src="` +
    appDir +
    `img/warren-wong-VVEwJJRRHgk-unsplash.jpeg" alt="" class="instructor-img-train">
                        <div class="div-block-339-train">
                          <div class="instructor-name-train"> Eliott Hanson, Phd</div>
                          <div class="instructor-subtitle-train">Computer Science Professor</div>
                          <div class="instructor-school-train">School of Computer Science</div>
                        </div>
                      </div>
                      <div class="inst-block-train sec"><img src="` +
    appDir +
    `img/t6.jpeg" alt="" class="instructor-img-train">
                        <div class="div-block-339-train">
                          <div class="instructor-name-train">Jean Long</div>
                          <div class="instructor-subtitle-train">Computer Science Professor</div>
                          <div class="instructor-school-train">School of Computer Science</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="syllabus" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Syllabus<br></div>
                    <div data-ix="fade-up-1" class="accordion js-accordion">
                      <div class="accordion-item-3 f">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ada5" class="accordion__title-2">
                          <div class="text-block-26">Introduction</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Welcome to Introduction to Data Science with Python!</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Syllabus Quiz (8 Questions)</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Important Pre-Course Survey</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670adc2" class="accordion__title-2">
                          <div class="text-block-26">Section 1: Linear Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.1 Introduction to Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.2 Error Evaluation and Model Comparison</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">1.3 Linear Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ade6" class="accordion__title-2">
                          <div class="text-block-26">Section 2: Multiple and Polynomial Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">2.1 Multiple Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">2.2 Techniques for Multilinear Modeling</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">2.3 Polynomial Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ae0a" class="accordion__title-2">
                          <div class="text-block-26">Section 3: Model Selection and Cross-Validation</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">3.1 Model Selection</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">3.2 Cross-Validation</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ae27" class="accordion__title-2">
                          <div class="text-block-26">Section 4: Bias, Variance, and Hyperparameters</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">4.1 Introductory Exercise</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">4.2 Bias and Variance</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">4.3 Ridge and LASSO</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ae4b" class="accordion__title-2">
                          <div class="text-block-26">Section 5: Classification and Logistic Regression</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">5.1 Classification and kNN</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">5.2 Logistic Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ae68" class="accordion__title-2">
                          <div class="text-block-26">Section 6: Multi-logstic Regression and Missingness</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">6.1 Multinomial Logistic Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">6.2 Missingness</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670ae85" class="accordion__title-2">
                          <div class="text-block-26">Section 7: Bootstrap, Confidence Intervals, and Hypothesis Testing</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">7.1 Inference in Linear Regression</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">7.2 Bootstrap and Confidence Intervals</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">7.3 Evaluating Predictor Significance</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670aea9" class="accordion__title-2">
                          <div class="text-block-26">Section 8: Capstone Project</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342 f">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">No Pre-reading</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">8.1 Introduction</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">8.2 Why is accuracy not enough?</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">8.3 Bayes Threshold</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-3">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670aecd" class="accordion__title-2 last">
                          <div class="text-block-26">Wrap-up</div><img src="` +
    appDir +
    `img/s_plus.png" alt="" class="image-63 right"><img src="` +
    appDir +
    `img/minus.png" width="18" alt="" class="image-63 right hiden">
                        </div>
                        <div class="accordion__content-wrap-2" style="height: 0px;">
                          <div class="accordion__content-2">
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Important post-course surveys</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197 visited">Review Videos</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Week 3</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                            <div class="div-block-342">
                              <div class="div-block-343"><img src="` +
    appDir +
    `img/play.png" alt="" class="image-63"></div>
                              <div class="div-block-133">
                                <div class="text-block-197">Final Notes</div>
                              </div>
                              <div class="div-block-143"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-name="reviews" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Reviews<br></div>
                    <div data-delay="4000" data-animation="slide" class="slider-5  w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true" role="region" aria-label="carousel">
                      <div class="w-slider-mask" id="w-slider-mask-9"><div class="w-slide" aria-label="1 of 1" role="group" style="transform: translateX(0px); opacity: 1;">
                          <div class="div-block-341 train">
                            <div class="div-block-139 test-block x train">
                              <div class="image_author-3"><img src="` +
    appDir +
    `img/636cf1dea11595d85363c94e_74.jpeg" alt="" class="image-119">
                                <div class="test-name-3">Inez Sierra</div>
                              </div>
                              <div class="test-text-2">
                                <div class="text-block-86">"It has been an amazing journey. I learnt a lot from it and I will go through different topics especially, functions and OOPS to have a better understanding."</div>
                              </div>
                            </div>
                          </div>
                        </div><div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore=""></div></div>
                      <div class="left-arrow-6 w-slider-arrow-left" role="button" tabindex="0" aria-controls="w-slider-mask-9" aria-label="previous slide" style="display: none;"><img src="` +
    appDir +
    `img/back.svg" alt="" class="image-120"></div>
                      <div class="right-arrow-6 w-slider-arrow-right" role="button" tabindex="0" aria-controls="w-slider-mask-9" aria-label="next slide" style="display: none;"><img src="` +
    appDir +
    `img/next.svg" alt="" class="image-ra-2"></div>

                    </div>

                  </div>
                </div>
                <div data-name="faq" class="panel">
                  <div id="about" class="about-2">
                    <div class="text-block-165-tr">Frequently Asked Questions<br></div>
                    <div data-ix="fade-up-1" class="accordion js-accordion">
                      <div class="accordion-item-2">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670af28" class="accordion__title__faq-2 first">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">When will I have access to the lectures and assignments?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2 last">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">Once you enroll for a Certificate, you’ll have access to all videos, quizzes, and programming assignments (if applicable). Peer review assignments can only be submitted and reviewed once your session has begun. If you choose to explore the course without purchasing, you may not be able to access certain assignments.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-2">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670af34" class="accordion__title__faq-2">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">What will I get if I subscribe to this Specialization?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">When you enroll in the course, you get access to all of the courses in the Specialization, and you earn a certificate when you complete the work. Your electronic Certificate will be added to your Accomplishments page - from there, you can print your Certificate or add it to your LinkedIn profile. If you only want to read and view the course content, you can audit the course for free.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item-2">
                        <div data-w-id="9fd1511c-d0cb-bbee-1215-631e2670af40" class="accordion__title__faq-2">
                          <div class="accordion__plus-wrapper-faq-2"><img src="` +
    appDir +
    `img/63b6e31b4cbb39101fa8cea7_right-arrow_163b6e31b4cbb39101fa8cea7_right-arrow.png" alt=""></div>
                          <div class="text-block-120">What are the requirements to attend this course?</div>
                        </div>
                        <div class="accordion__content-wrap" style="height: 0px;">
                          <div class="accordion__content_faq">
                            <div class="faq__block-2 last">
                              <div class="div-block-40-faq">
                                <div class="text-block-86">Access to a computer with an internet connection.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(div);
}

function getAppDir() {
  var scripts = document.getElementsByTagName("script");
  var currentScript = Array.prototype.filter.call(scripts, function (script) {
    return script.src.indexOf("ibl-web-mentor-snippet") !== -1;
  })[0];
  return currentScript.src.substring(0, currentScript.src.lastIndexOf("/") + 1);
}

function addCSS() {
  var currentVersion = "1.1.3";
  var appDir = getAppDir();
  const cssFile =
    appDir + "/css/ibl-web-mentor-snippet.css?v=" + currentVersion;
  const linkElement = document.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("type", "text/css");
  linkElement.setAttribute("href", cssFile);
  document.head.appendChild(linkElement);
}

function initiateAction(type, value) {
  showQuestionPage();
  // let endpoint='';

  // if(type == 'ai_mentor'){
  //    endpoint = 'ai_mentor';
  // }
  // else if(type == 'summarize'){
  //    endpoint = 'summarize';
  // }
  // else if(type == 'expand'){
  //    endpoint = 'epxpand';
  // }
}

function showQuestionPage() {
  $(".div-block-276.first").addClass("hide");
  $(".div-block-276.second").addClass("show");
}

$ = jQuery;
$(document).ready(function () {
  const qaArray = [
    {
      question: "What is Python?",
      answer:
        "Python is a high-level programming language that is easy to learn and widely used in many fields, including data science and machine learning.",
    },
    {
      question: "What is machine learning?",
      answer:
        "Machine learning is a subset of artificial intelligence that involves training algorithms to learn from data and make predictions or decisions without being explicitly programmed.",
    },
    {
      question:
        "What is the difference between supervised and unsupervised learning?",
      answer:
        "Supervised learning involves training a machine learning model with labeled data, while unsupervised learning involves training a model with unlabeled data.",
    },
    {
      question:
        "What is the purpose of a Python library such as Pandas in machine learning?",
      answer:
        "Pandas is a popular Python library that provides data manipulation and analysis tools, which can be helpful for preparing data for machine learning models.",
    },
    {
      question: "What is overfitting in machine learning?",
      answer:
        "Overfitting occurs when a machine learning model is trained too well on a particular set of data, to the point that it becomes too specialized to that data and performs poorly on new, unseen data.",
    },
    {
      question: "What is a neural network?",
      answer:
        "A neural network is a type of machine learning algorithm modeled after the structure and function of the human brain, consisting of interconnected nodes that process information and make predictions.",
    },
    {
      question: "What is deep learning?",
      answer:
        "Deep learning is a type of machine learning that uses artificial neural networks with multiple layers to learn and make predictions from complex data, such as images or audio.",
    },
    {
      question: "What is a decision tree in machine learning?",
      answer:
        "A decision tree is a type of supervised learning algorithm that uses a tree-like model of decisions and their possible consequences to make predictions or decisions.",
    },
    {
      question: "What is gradient descent in machine learning?",
      answer:
        "Gradient descent is an optimization algorithm used in machine learning to minimize the error of a model by adjusting its parameters iteratively in the direction of steepest descent.",
    },
    {
      question: "What is a support vector machine?",
      answer:
        "A support vector machine is a type of supervised learning algorithm that classifies data by finding the best hyperplane that separates the classes with the largest margin.",
    },
  ];

  //if focus is on input and enter is pressed
  $(".ask-input2").keypress(function (e) {
    if (e.which == 13) {
      if ($(".ask-input2").val() == "") {
        return;
      } else {
        $(".ask-submit-follow-up").trigger("click");
      }
    }
  });

  let clickCount = 0;
  $(".ask-submit-follow-up").click(function () {
    var appDir = getAppDir();
    let q = $(".ask-input2").val();
    $(".ask-input2").val("");
    $(".reg-btn").hide();

    //create new div
    let qDiv = document.createElement("div");
    qDiv.classList.add("div-block-278");
    qDiv.innerHTML =
      `<div class="rep-div"><div class="div-block-279"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640f14a724ccc79823003a6c_user.png" loading="lazy" alt="" class="image-25"></div><div>` +
      q +
      `</div></div>`;
    $(".chat-response .grow-flex").append(qDiv);

    let aDiv = document.createElement("div");
    aDiv.className = "div-block-278 bot-rep";

    aDiv.innerHTML =
      `<div class="rep-div bot-rep"><div class="div-block-279 bot-gb"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640f142dfef4eb2eca0a0d91_abstract.png" loading="lazy" alt="" class="image-25 bot-img"></div><div class="div-block-281"><div class="text-block-187 index_` +
      clickCount +
      `"></div><div class="sources_f index_` +
      clickCount +
      `"><div class="text-block-104">Learn more:</div><div><a href="#" class="link-block-21 w-inline-block"><div class="text-block-172">1. en.wikipedia.org</div></a></div><div><a href="#" class="link-block-21 w-inline-block"><div class="text-block-172">2. investopedia.com</div></a></div><div><a href="#" class="link-block-21 w-inline-block"><div class="text-block-172">3. ibm.com</div></a></div></div><div class="related_f index_` +
      clickCount +
      `"><div class="text-block-171">Related:</div><div class="rel-row"><div class="text-block-192">Ways to make a difference</div><div class="div-block-294-open"><img src="` +
      appDir +
      `img/delete.png" loading="lazy" alt="" class="hidden-img"><img src=""` +
      appDir +
      `img/delete.png" loading="lazy" alt="" class="hidden-img-rot"></div><div class="div-block-294"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-116"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-93-rot"></div></div><div class="rel-answer"><div class="answer-text">One &nbsp;way to make a difference is by practicing kindness in your daily interactions with others. This could be as simple as holding the door open for someone, offering a smile or compliment, or lending a listening ear to a friend or stranger. Small acts of kindness can have a ripple effect and contribute to a more positive and compassionate world.</div></div><div class="rel-row sec"><div class="text-block-192">How to help the environment</div><div class="div-block-294-open"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640b1c608bfe23641e3af04a_delete.png" loading="lazy" alt="" class="hidden-img"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640b1c608bfe23fd843af04c_delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div><div class="div-block-294"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-116"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-93-rot"></div></div><div class="rel-answer"><div class="answer-text">To help the environment, there are many things we can do in our daily lives. One of the most important is to reduce our waste by using reusable bags, containers, and water bottles, and recycling whenever possible.</div></div><div class="rel-row sec"><div class="text-block-192">Volunteer opportunities </div><div class="div-block-294-open"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640b1c608bfe23641e3af04a_delete.png" loading="lazy" alt="" class="hidden-img"><img src="https://assets.website-files.com/63fdf140d3e5fb227d1c78ba/640b1c608bfe23fd843af04c_delete1x.png" loading="lazy" alt="" class="hidden-img-rot"></div><div class="div-block-294"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-116"><img src="https://assets.website-files.com/63efb3c265a5145314a5ae68/63f8f51f6471e138ecf5f406_63efb3c265a5144988a5aea8_63ea59c8a06f760a6f1b3d18_plus.png" loading="lazy" alt="" class="image-93-rot"></div></div><div class="rel-answer"><div class="answer-text">One of the most popular volunteer opportunities is in environmental organizations, where volunteers can help with tasks such as cleaning up litter, planting trees, and conducting environmental research.</div></div></div></div></div>`;
    $(".chat-response .grow-flex").append(aDiv);

    $(".div-block-294").click(function () {
      $(this).parent().addClass("open");
      $(this).parent().next(".rel-answer").addClass("open");
    });

    $(".div-block-294-open").click(function () {
      $(this).parent().removeClass("open");
      $(this).parent().next(".rel-answer").removeClass("open");
    });
    index = clickCount;
    $(".reg").removeClass("reg-show");

    setTimeout(function () {
      if (q != null) {
        var scriptTag = document.querySelector('script[src*="jquery.min.js"]');
        var urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
        var tenant = urlParams.get("tenant");
        $.ajax({
          type: "POST",
          url:
            "https://mentor.ibl.ai/" +
            "/wp-json/ibl-web-ai-mentor-theme/v1/ask-question",
          data: {
            question: q,
            tenant: tenant,
          },
          success: function (data) {
            var i = 0;
            let txt = data.answer;
            var speed = 20;
            function ftypeWriter() {
              if (i < txt.length) {
                $(".index_" + index)[0].innerHTML += txt.charAt(i);
                i++;
                speed = Math.floor(Math.random() * 15) + 1;
                setTimeout(ftypeWriter, speed);
              } else {
                $(".index_" + index)[0].classList.add("no-after");
                $(".sources_f.index_" + index).show();
                $(".related_f.index_" + index).show();
                $(".reg-btn").show();
                $(".reg").addClass("reg-show");
                if (q.length > 27) {
                  var question = q.substring(0, 27) + "...";
                } else {
                  var question = q;
                }
                titleWriter(question);
              }
            }
            ftypeWriter();
          },
        });
      }
      clickCount++;
    }, 1000);
  });
});

function followTypeWriter(qaArray, index) {
  var i = 0;
  var txt = qaArray[index].answer;
  var speed = 20;

  // function ftypeWriter() {
  //     if (i < txt.length) {
  //         $('.index_'+index)[0].innerHTML += txt.charAt(i);
  //         i++;
  //         speed = Math.floor(Math.random() * 15) + 1;
  //         setTimeout(ftypeWriter, speed);
  //     }
  //     else {
  //         $('.index_'+index)[0].classList.add("no-after");
  //         $('.sources_f.index_'+index).show();
  //         $('.related_f.index_'+index).show();
  //         $('.reg-btn').show();
  //         if(qaArray[index].question.length > 27){
  //             var question = qaArray[index].question.substring(0,27) + '...';
  //         }
  //         else{
  //             var question = qaArray[index].question;
  //         }
  //         titleWriter(question);
  //     }
  // }
  ftypeWriter();
}

function titleWriter(txt3) {
  $(".new-chat-text").html("");
  $(".new-chat-text").addClass("with_blink");
  var y = 0;

  setTimeout(function () {
    function titleType() {
      if (y < txt3.length) {
        $(".new-chat-text")[0].innerHTML += txt3.charAt(y);
        //   $('.new-chat-text')[1].innerHTML += txt3.charAt(y);
        y++;
        speed = Math.floor(Math.random() * 100) + 4;
        setTimeout(titleType, speed);
      } else {
        $(".new-chat-text").removeClass("with_blink");
      }
    }

    titleType();
  }, 1000);
}

function addFonts() {}

function typeWriter1() {
  $(".history").removeClass("hidden");
  if (i < txt.length) {
    $(".text-block-187")[0].innerHTML += txt.charAt(i);
    i++;
    speed = Math.floor(Math.random() * 15) + 1;
    setTimeout(typeWriter1, speed);
  } else {
    $(".text-block-187")[0].classList.add("no-after");
  }
}

function typeWriter3(q) {
  $(".new-chat-text").html("");
  $(".new-chat-text").addClass("with_blink");
  var y = 0;
  var txt3 = q;
  setTimeout(function () {
    $(".text-block-169")[1].style.display = "block";
    function type3() {
      $(".div-block-325").addClass("rel");
      if (y < txt3.length) {
        $(".new-chat-text")[0].innerHTML += txt3.charAt(y);
        y++;
        speed = Math.floor(Math.random() * 100) + 4;
        setTimeout(type3, speed);
      } else {
        $(".new-chat-text").removeClass("with_blink");
      }
    }
    type3();
  }, 1000);
}
