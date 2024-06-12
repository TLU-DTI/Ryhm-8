<script lang="ts">
  function shake() {
    (function () {
      var MIN_HEIGHT = 30;
      var MIN_WIDTH = 30;
      var MAX_HEIGHT = 350;
      var MAX_WIDTH = 350;

      var PATH_TO_SONG =
        'https://raw.githubusercontent.com/Elfoslav/harlem-shake/master/music/harlem-shake.ogg';

      var CSS_BASE_CLASS = 'mw-harlem_shake_me';
      var CSS_SLOW_CLASS = 'mw-harlem_shake_slow';
      var CSS_FIRST_CLASS = 'im_first';
      var CSS_OTHER_CLASSES = ['im_drunk', 'im_baked', 'im_trippin', 'im_blown'];

      var CSS_STROBE_CLASS = 'mw-strobe_light';

      var FILE_ADDED_CLASS = 'mw_added_css';

      function addCSS() {
        var css = document.createElement('style');
        css.append(
          '.mw-strobe_light{position:fixed;width:100%;height:100%;top:0;left:0;z-index:100000;background-color:rgba(250,250,250,.8);display:block}.mw-harlem_shake_me{transition:.8s ease-in-out;-moz-transition:.8s ease-in-out;-webkit-transition:.8s ease-in-out;-o-transition:.8s ease-in-out;-ms-transition:.8s ease-in-out;animation:1s linear infinite spin;-moz-animation:1s linear infinite spin;-webkit-animation:1s linear infinite spin;-o-animation:1s linear infinite spin;-ms-animation:spin 1s infinite linear}.mw-harlem_shake_slow{transition:3.2s ease-in-out;-moz-transition:3.2s ease-in-out;-webkit-transition:3.2s ease-in-out;-o-transition:3.2s ease-in-out;-ms-transition:3.2s ease-in-out;animation:4s linear infinite spin;-moz-animation:4s linear infinite spin;-webkit-animation:4s linear infinite spin;-o-animation:4s linear infinite spin;-ms-animation:spin 4s infinite linear}body{-webkit-backface-visibility:hidden}.mw-harlem_shake_me{-webkit-animation-duration:.4s;-moz-animation-duration:.4s;-o-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.mw-harlem_shake_slow{-webkit-animation-duration:1.6s;-moz-animation-duration:1.6s;-o-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.flash,.mw-strobe_light{-webkit-animation-name:flash;-moz-animation-name:flash;-o-animation-name:flash;animation-name:flash}@-webkit-keyframes shake{0%,100%{-webkit-transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px)}}@-moz-keyframes shake{0%,100%{-moz-transform:translateX(0)}10%,30%,50%,70%,90%{-moz-transform:translateX(-10px)}20%,40%,60%,80%{-moz-transform:translateX(10px)}}@-o-keyframes shake{0%,100%{-o-transform:translateX(0)}10%,30%,50%,70%,90%{-o-transform:translateX(-10px)}20%,40%,60%,80%{-o-transform:translateX(10px)}}@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-10px)}20%,40%,60%,80%{transform:translateX(10px)}}.im_baked,.shake{-webkit-animation-name:shake;-moz-animation-name:shake;-o-animation-name:shake;animation-name:shake}.im_drunk,.swing{-webkit-transform-origin:top center;-moz-transform-origin:top center;-o-transform-origin:top center;transform-origin:top center;-webkit-animation-name:swing;-moz-animation-name:swing;-o-animation-name:swing;animation-name:swing}@-webkit-keyframes wobble{0%,100%{-webkit-transform:translateX(0)}15%{-webkit-transform:translateX(-15%) rotate(-4deg)}30%{-webkit-transform:translateX(12%) rotate(3deg)}45%{-webkit-transform:translateX(-9%) rotate(-2deg)}60%{-webkit-transform:translateX(6%) rotate(2deg)}75%{-webkit-transform:translateX(-3%) rotate(-1deg)}}@-moz-keyframes wobble{0%,100%{-moz-transform:translateX(0)}15%{-moz-transform:translateX(-15%) rotate(-5deg)}30%{-moz-transform:translateX(12%) rotate(3deg)}45%{-moz-transform:translateX(-9%) rotate(-3deg)}60%{-moz-transform:translateX(6%) rotate(2deg)}75%{-moz-transform:translateX(-3%) rotate(-1deg)}}@-o-keyframes wobble{0%,100%{-o-transform:translateX(0)}15%{-o-transform:translateX(-15%) rotate(-5deg)}30%{-o-transform:translateX(12%) rotate(3deg)}45%{-o-transform:translateX(-9%) rotate(-3deg)}60%{-o-transform:translateX(6%) rotate(2deg)}75%{-o-transform:translateX(-3%) rotate(-1deg)}}@keyframes wobble{0%,100%{transform:translateX(0)}` 15%{transform:translateX(-15%) rotate(-5deg)}30%{transform:translateX(12%) rotate(3deg)}45%{transform:translateX(-9%) rotate(-3deg)}60%{transform:translateX(6%) rotate(2deg)}75%{transform:translateX(-3%) rotate(-1deg)}}.im_first,.wobble{-webkit-animation-name:wobble;-moz-animation-name:wobble;-o-animation-name:wobble;animation-name:wobble}@-webkit-keyframes pulse{0%,100%{-webkit-transform:scale(1)}50%{-webkit-transform:scale(1.1)}}@-moz-keyframes pulse{0%,100%{-moz-transform:scale(1)}50%{-moz-transform:scale(1.1)}}@-o-keyframes pulse{0%,100%{-o-transform:scale(1)}50%{-o-transform:scale(1.1)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}.im_blown,.pulse{-webkit-animation-name:pulse;-moz-animation-name:pulse;-o-animation-name:pulse;animation-name:pulse}@-webkit-keyframes bounceIn{0%{opacity:0;-webkit-transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05)}70%{-webkit-transform:scale(.9)}100%{-webkit-transform:scale(1)}}@-moz-keyframes bounceIn{0%{opacity:0;-moz-transform:scale(.3)}50%{opacity:1;-moz-transform:scale(1.05)}70%{-moz-transform:scale(.9)}100%{-moz-transform:scale(1)}}@-o-keyframes bounceIn{0%{opacity:0;-o-transform:scale(.3)}50%{opacity:1;-o-transform:scale(1.05)}70%{-o-transform:scale(.9)}100%{-o-transform:scale(1)}}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.bounceIn,.im_trippin{-webkit-animation-name:bounceIn;-moz-animation-name:bounceIn;-o-animation-name:bounceIn;animation-name:bounceIn}'
        );
        document.body.appendChild(css);
      }

      function removeAddedFiles() {
        var addedFiles = document.getElementsByClassName(FILE_ADDED_CLASS);
        for (var i = 0; i < addedFiles.length; i++) {
          document.body.removeChild(addedFiles[i]);
        }
      }

      function flashScreen() {
        var flash = document.createElement('div');
        flash.setAttribute('class', CSS_STROBE_CLASS);
        document.body.appendChild(flash);

        setTimeout(function () {
          document.body.removeChild(flash);
        }, 100);
      }

      function size(node) {
        return {
          height: node.offsetHeight,
          width: node.offsetWidth
        };
      }

      function withinBounds(node: Element) {
        var nodeFrame = size(node);
        return (
          nodeFrame.height > MIN_HEIGHT &&
          nodeFrame.height < MAX_HEIGHT &&
          nodeFrame.width > MIN_WIDTH &&
          nodeFrame.width < MAX_WIDTH
        );
      }

      function posY(elm) {
        var test = elm;
        var top = 0;
        while (test) {
          top += test.offsetTop;
          test = test.offsetParent;
        }
        return top;
      }

      function viewPortHeight() {
        var de = document.documentElement;
        if (window.innerWidth) {
          return window.innerHeight;
        } else if (de && !isNaN(de.clientHeight)) {
          return de.clientHeight;
        }
        return 0;
      }

      function scrollY() {
        if (window.pageYOffset) {
          return window.pageYOffset;
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      }

      var vpH = viewPortHeight();
      var st = scrollY();
      function isVisible(node) {
        var y = posY(node);

        return y >= st && y <= vpH + st;
      }

      function playSong() {
        var audioTag = document.createElement('audio');
        audioTag.setAttribute('class', FILE_ADDED_CLASS);
        audioTag.src = PATH_TO_SONG;
        audioTag.loop = false;

        var harlem = false,
          shake = false,
          slowmo = false;

        audioTag.addEventListener(
          'timeupdate',
          function () {
            var time = audioTag.currentTime,
              nodes = allShakeableNodes,
              len = nodes.length,
              i;

            // song started, start shaking first item
            if (time >= 0.5 && !harlem) {
              harlem = true;
              shakeFirst(firstNode);
            }

            // everyone else joins the party
            if (time >= 15.5 && !shake) {
              shake = true;
              stopShakeAll();
              flashScreen();
              for (i = 0; i < len; i++) {
                shakeOther(nodes[i]);
              }
            }

            // slow motion at the end
            if (audioTag.currentTime >= 28.4 && !slowmo) {
              slowmo = true;
              shakeSlowAll();
            }
          },
          true
        );

        audioTag.addEventListener(
          'ended',
          function () {
            stopShakeAll();
            removeAddedFiles();
          },
          true
        );

        audioTag.innerHTML =
          '<p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p>';

        document.body.appendChild(audioTag);
        audioTag.play();
      }

      function shakeFirst(node) {
        node.className += ' ' + CSS_BASE_CLASS + ' ' + CSS_FIRST_CLASS;
      }
      function shakeOther(node) {
        node.className +=
          ' ' +
          CSS_BASE_CLASS +
          ' ' +
          CSS_OTHER_CLASSES[Math.floor(Math.random() * CSS_OTHER_CLASSES.length)];
      }

      function shakeSlowAll() {
        var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
        for (var i = 0; i < shakingNodes.length; ) {
          shakingNodes[i].className = shakingNodes[i].className.replace(
            CSS_BASE_CLASS,
            CSS_SLOW_CLASS
          );
        }
        CSS_BASE_CLASS = CSS_SLOW_CLASS;
      }

      function stopShakeAll() {
        var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
        var regex = new RegExp('\\b' + CSS_BASE_CLASS + '\\b');
        for (var i = 0; i < shakingNodes.length; ) {
          shakingNodes[i].className = shakingNodes[i].className.replace(regex, '');
        }
      }

      // get first item
      var allNodes = document.getElementsByTagName('*'),
        len = allNodes.length,
        i,
        thisNode;
      var firstNode = null;
      for (i = 0; i < len; i++) {
        thisNode = allNodes[i];
        if (withinBounds(thisNode)) {
          if (isVisible(thisNode)) {
            firstNode = thisNode;
            break;
          }
        }
      }

      if (thisNode === null) {
        console.warn('Could not find a node of the right size. Please try a different page.');
        return;
      }

      // insert CSS
      addCSS();

      // play song
      playSong();

      var allShakeableNodes = [];

      for (i = 0; i < len; i++) {
        thisNode = allNodes[i];
        if (withinBounds(thisNode)) {
          allShakeableNodes.push(thisNode);
        }
      }
    })();
  }
</script>

<button onclick={shake} class="border-2 bg-yellow-500">Shake</button>
