<?
include 'header.php';
?>

<div class="container">
  <div class="main-menu-container">
    <button> click </button>
    <a href="game" class="main-menu-btn main-menu-play-btn">
        Play
    </a>
     <a href="record" class="main-menu-btn main-menu-play-btn">
        Records
    </a>
     <a href="game/index.php" class="main-menu-btn main-menu-play-btn">
        Help
    </a>
     <a href="game/index.php" class="main-menu-btn main-menu-play-btn">
        About us
    </a>
     <a href="game/index.php" class="main-menu-btn main-menu-play-btn">
        Exit
    </a>
  </div>
</div>

<script>



app.fileLoader.createLoadManager( "question-pack" ).bindToElement( document.querySelector("button") );

setTimeout( () => {
app.speakerctrl.testT({data : "1 seconds sleep", time : 1});
app.speakerctrl.testT({data : "5 seconds sleep", time : 5});


// app.speakerctrl.testT({data : "10 seconds sleep", time : 10});
} , 100 );

setInterval( () => {console.log("1 second passed")} , 1000 );

</script>

<?

include 'footer.php';

?>

