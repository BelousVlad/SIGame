class App{

	constructor()
	{



		this.view_model = new ViewModel();
		this.initSpeker();
		this.initRoutes();



		this.clickEventer = new Eventer();
		this.pager = new Pager(this.XMLRequest);

		this.clickEventer.addEvent("a", (event) => {

			let link = $(event.target).attr("href").trim();

			this.pager.changePage(link);

			return false;
		})

		$(document).bind("click", (event) => {
			return this.clickEventer.checkAndRun(event.target,event);
		})

		window.onpopstate = (event) => {
		    this.pager.changePage(document.URL, false);
		}

	}

//
// 	SecretCodeBlock (don't work)
//
	// async getSecretCode(){ // RETURN PROMISE

	// 	if ( window.localStorage.getItem( 'sercretCode' ) == null ){
	// 		let val = await this.makeSecretCode.call(this)

	// 		window.localStorage.setItem ( 'secretCode', val);
	// 	}
	// 	return window.localStorage.getItem( 'secretCode' );

	// }

	// async setSecretCode( json ){

	// 	let code = json.data;
	// 	window.localStorage.setItem( 'secretCode', code );
	// 	window.dispatchEvent( new CustomEvent( 'secretCodeReceived', { detail : { data : code } } ) );    // WARNING X WARNING X WARNING. CustomEvent object don't deleted in future and keep storing after func (maybe)

	// }

	// async makeSecretCode(){

	// 	let prom = new Promise( (resolve, reject) => { window.addEventListener( 'secretCodeReceived',  (e) => { resolve( e.detail.data )} ) } /* */ );
	// 	this.speakerctrl.makeSecretCode();
	// 	return await prom;

	// }

//
//  end ---
//


	initRoutes()
	{
		this.routes = {
			"set_client_code" : "setClientCode",
			"get_lobbies" : "viewLobbies",
			"connect_to_lobby" : "lobbyConnect",
			"setPlayerUniqueKey" : "setPlayerKey",
			"set_secret_code" : "setSecretCode"
		};
	}

	initSpeker()
	{

		this.speakerctrl = new ServerSpeakerController();

	    this.speakerctrl.speaker.onopen = (event) => {
	        this.view_model.hideLoader();
	        this.speakerctrl.sendClientCode( window.localStorage.getItem('secretCode') );
	    };

	    this.speakerctrl.speaker.onmessage = (event) => {
	        // console.log(event.data);
	        this.getServerMessage(event.data);
	    };

	    this.speakerctrl.speaker.onerror = (event) =>
	    {
	        console.log("error");
	        console.log(event.msg);
	    }

	    this.speakerctrl.speaker.onclose = (event) =>
	    {
	        this.view_model.viewLoader();
	        this.speakerctrl.speaker.openSocket();
	    }

	    this.speakerctrl.speaker.openSocket();
	}



	getServerMessage(message)
	{


		let ans = JSON.parse(message);
		this[this.routes[ans.action]](ans);


	}

	viewLobbies(json)
	{
		let arr = json.data;

		this.view_model.viewLobbies(arr);

	}


//  -------------------
	// Actions (routes)
//  -------------------

	refreshLobbies()
	{
		//console.log(this);

		this.speakerctrl.getLobbies();
	}



	lobbyConnect(json){

		this.speakerctrl.lobbyConnect(json);

	}

	setPlayerKey (json) {

	}

	fastInit(){
		this.speakerctrl.fastInit();
	}

	setClientCode( json ) {
		// alert(1);
		let data = json.data;
		window.localStorage.setItem( "client_code", data);
		console.log(data);
	}

//  -------------------
	//  END of Actions block
//  -------------------

}