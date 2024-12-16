<?php
if (isset($_POST['submit'])) {
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "himanshu.lifelinkr@gmail.com, 4exult@gmail.com, gchauhan.dm@gmail.com, rakshitkapur.dm@gmail.com";
    // $email_to = "himanshu.lifelinkr@gmail.com";
    $email_subject = "Query from LifeLinkr SL LP (Top Form) - Automate Your IVF Clinic";

    // validation: expected data exists
    if (
        !isset($_POST['name']) ||
        !isset($_POST['phone']) ||
        !isset($_POST['email']) ||
        !isset($_POST['clinicname'])
    ) {
        die('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    // Sanitize and assign POST data to variables
    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $phone = $_POST['phone']; // required
    $alternate_number = $_POST['alternate_phone'];
    $clinic_name = $_POST['clinicname']; // required


        // Retrieve the full URL of the referring page
 $full_url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'N/A';

 // Extract UTM parameters from the URL
 $utm_source = 'N/A';
 $utm_medium = 'N/A';
 $utm_campaign = 'N/A';
 $utm_term = 'N/A';  // New parameter
 $utm_content = 'N/A';  // New parameter

 if ($full_url !== 'N/A') {
     $url_components = parse_url($full_url);
     
     if (isset($url_components['query'])) {
         parse_str($url_components['query'], $query_params);
         $utm_source = isset($query_params['utm_source']) ? $query_params['utm_source'] : 'N/A';
         $utm_medium = isset($query_params['utm_medium']) ? $query_params['utm_medium'] : 'N/A';
         $utm_campaign = isset($query_params['utm_campaign']) ? $query_params['utm_campaign'] : 'N/A';
         $utm_term = isset($query_params['utm_term']) ? $query_params['utm_term'] : 'N/A';  // Extract utm_term
         $utm_content = isset($query_params['utm_content']) ? $query_params['utm_content'] : 'N/A';  // Extract utm_content
     }
 }

    // Function to sanitize input data
    function clean_string($string) {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $ip = $_SERVER['REMOTE_ADDR'];

    // Prepare email message
    $email_message = "";
    $email_message .= "Clinic Name: " . clean_string($name) . "\n";
    $email_message .= "Company Email: " . clean_string($email) . "\n";
    $email_message .= "Mobile: " . clean_string($phone) . "\n";
    $email_message .= "Alternate Mobile: " . clean_string($alternate_number) . "\n";
    $email_message .= "Clinic Location: " . clean_string($clinic_name) . "\n";
    $email_message .= "IP Address: " . clean_string($ip) . "\n";
    $email_message .= "Full URL: " . clean_string($full_url) . "\n";
    $email_message .= "UTM Source: " . clean_string($utm_source) . "\n";
    $email_message .= "UTM Medium: " . clean_string($utm_medium) . "\n";
    $email_message .= "UTM Campaign: " . clean_string($utm_campaign) . "\n";
    @$email_message .= "UTM Term: " . clean_string($utm_term) . "\n";  // Add utm_term
    @$email_message .= "UTM Content: " . clean_string($utm_content) . "\n";  // Add utm_content

    // Email headers
    $headers = "From: hello@lifelinkr.com\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    // Send email
    @mail($email_to, $email_subject, $email_message, $headers);
}
?>


<html>

<style>
  *{
  box-sizing:border-box;
 /* outline:1px solid ;*/
}
body{
background: #ffffff;
background: linear-gradient(to bottom, #ffffff 0%,#e1e8ed 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e8ed',GradientType=0 );
    height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
  
}

.wrapper-1{
  width:100%;
  height:100vh;
  display: flex;
flex-direction: column;
}
.wrapper-2{
  padding :30px;
  text-align:center;
}
h1{
    font-family: 'Kaushan Script', cursive;
  font-size:4em;
  letter-spacing:3px;
  color: #023acd ;
  margin:0;
  margin-bottom:20px;
}
.wrapper-2 p{
  margin:0;
  font-size:1.3em;
  color:#aaa;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.go-home{
  cursor: pointer;
  color:#fff;
  background: #023acd;
  border:none;
  padding:10px 50px;
  margin:30px 0;
  border-radius:30px;
  text-transform:capitalize;
  box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
}
.footer-like{
  margin-top: auto; 
  background:#D7E6FE;
  padding:6px;
  text-align:center;
}
.footer-like p{
  margin:0;
  padding:4px;
  color:#5892FF;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.footer-like p a{
  text-decoration:none;
  color:#5892FF;
  font-weight:600;
}

@media (min-width:360px){
  h1{
    font-size:4.5em;
  }
  .go-home{
    margin-bottom:20px;
  }
}

@media (min-width:600px){
  .content{
  max-width:1000px;
  margin:0 auto;
}
  .wrapper-1{
  height: initial;
  max-width:620px;
  margin:0 auto;
  margin-top:50px;
  box-shadow: 4px 8px 40px 8px rgba(88, 146, 255, 0.2);
}
  
}
  </style>
<body>

<div class=content>
  <div class="wrapper-1">
    <div class="wrapper-2">
      <h1>Thank you !</h1>
      <p>We have received your query.  </p>
      <p>Our team member will contact you soon  </p>
      <button class="go-home"><a href="tel:+91 9667059903" style="color:white; text-decoration:none;">
      Call Now
      </button>
    </div>
</div>
</div>



<link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro" rel="stylesheet">

</body>


<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K3MZPQ8T');</script>
<!-- End Google Tag Manager -->


<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K3MZPQ8T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


<script>
			window.onload = function() {       
    setTimeout(function(){
    window.location.href='https://www.lifelinkr.com/ivf-software/';
},3000); 
}
</script>

</html>
