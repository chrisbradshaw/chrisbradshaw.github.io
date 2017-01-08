<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chris Bradshaw</title>
  <link rel="stylesheet" type="text/css" href="css/chris-bradshaw.css">
  <link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
  <link rel="shortcut icon" type="images/favicon.ico" href="images/favicon.ico">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/light-grid.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js">
</head>
<body>
  <div class="container1">
  <header id="header" class="row">

  <div id="illustration" class="col-6">
    <a href="index.html"><img src="images/chris-bradshaw-sketch.jpg" alt="Chris Bradshaw" class="drawing" title="Chris Bradshaw">
    </div></a>

    <div class="contact-div col-6">

      <!-- Logo and Contact Information -->

  
      <h1><a href="index.html">Chris Bradshaw</a></h1>
      <h3><a href="index.html">200 Hudson St</a></h3>
      <h3><a href="index.html">Hoboken, NJ 07030</a></h3>

  </div>  
      <div class="navbar-div clearfix">
        <nav id="navbar">
            <a href="about.html" class="nav-button">Who am I?</a>
            <a href="services.html" class="nav-button">How I can help you</a>
            <a href="portfolio.html"class="nav-button">Check out my work</a>
            <a href="contact.php" class="nav-button" id="selected">Let's talk</a>
        </nav>
      </div>
      </header>
    </div> 


</div>

  <!-- Site Content -->

   <div class="row">

      <div class="col-6">
        <h4>Meet For Consultation</h4>
        <figcaption>I am available to meet in the NYC area. Send me an email if you are interested in meeting at a location such as the 20 Church St Starbucks (below).</figcaption>
        <figure>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1297.3516615355018!2d-74.00880552920708!3d40.71377959778504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x1e86ac81e74b12fb!2sStarbucks!5e0!3m2!1sen!2sus!4v1442351008584" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
          </figure>

      </div>



        
  <section class="col-6">
      <h4>Shoot Me An Email</h4>
      <figcaption>This form will email <a href="mailto:hello@chris-bradshaw.com">hello@chris-bradshaw.com</a>, I will respond as quickly as possible.</figcaption>

      <?php if ($_GET['s'] == 'success') { ?>
        <p class="response">Thank you. Your message has been successfully submitted!</p>
      <?php } else if ($_GET['s'] == 'error') { ?>
        <p class="response">Error. Your message was not sent! Make sure you type in the proper verification numbers. <a href="contact.php">Click here to try again</a>. If issues persist please send an email to <a href="mailto:hello@chris-bradshaw.com">admin@chrisbradshaw.com</a>.</p>
      <?php } else { ?>

    <!-- Contact Form -->
    <form action="mailer.php" method="post">

      <label for="fullname">Name</label>
      <span id="fullname-error" class="error">must be more than two characters.</span>
      <input type="text" id="fullname" name="fullname" placeholder="your name">

      <label for="email">Email</label>
      <span id="email-error" class="error">must be a valid email.</span>
      <input type="text" id="email" name="email" placeholder="your email">
            
      <label for="phone">Phone</label>
      <input type="tel" id="phone" name="phone" placeholder="your phone (optional)">
            
      <label for="message">Message</label>
      <span id="message-error" class="error">cannot be left blank.</span>
      <textarea id="message" name="message" rows="8" cols="50"></textarea>

      <input type="text" name="verify" class="verify-box" placeholder="enter number on left to verify you are human">
      <img class="verify-img" src="verificationimage.php?<?php echo rand(0,9999)?>" alt="verification image">
            
      <input type="submit" value="send">
    </form>

      <?php } ?>

      </section>



  <!-- Social Media Contact links -->
  <div class="social-div">
    <a href="mailto:hello@chris-bradshaw.com">
      <img src="images/social-icons/mail-with-circle.svg" alt="email" class="social-icon">
    </a>
    <a href="http://www.twitter.com/chrisbradshaw33">
    <img src="images/social-icons/twitter-with-circle.svg" alt="twitter" class="social-icon">
  </a>
    <a href="http://www.facebook.com/cbradshaw1">
      <img src="images/social-icons/facebook-with-circle.svg" alt="facebook" class="social-icon">
    </a>
    <a href="http://instagram.com/chrisbradshaw33/">
    <img src="images/social-icons/instagram-with-circle.svg" alt="instagram" class="social-icon">
  </a>
    <a href="https://github.com/chrisbradshaw3">
    <img src="images/social-icons/github-with-circle.svg" alt="github" class="social-icon">
  </a>
    <a href="https://www.linkedin.com/in/chrisbradshaw3">
    <img src="images/social-icons/linkedin-with-circle.svg" alt="linkedin" class="social-icon">
  </a>
  </div>
  
  <span class="call-email">
      <a href="tel:+12013069772"><i class="fa fa-phone" id="phone" title="Call Me"></i></a> <br>
      <a href="mailto:hello@chris-bradshaw.com"><i class="fa fa-envelope" title="Email Me"></i></a><br>
      <a href="portfolio.html"><i class="fa fa-suitcase wiggle" id="suitcase" title="Check Out My Work"></i> <a>
 
  </span>

<footer> &copy; 2015 Chris Bradshaw</footer>

  <script src="js/jquery-min.js"></script>
  <script src="js/jquery.classywiggle.min.js"></script>
  <script src="js/main.js"></script>
  <script src="js/contact.js"></script>

</body>
</html>