document.addEventListener("DOMContentLoaded", function() {

    let rightcard = false;
    let leftcard = true;
    let tempblock;
    let tempblock2;
    let card = {
        descricao: '',
        texto: ''
    }

    flowy(document.getElementById("canvas"), drag, release, snapping, rearrange);

    function addEventListenerMulti(type, listener, capture, selector) {
        let nodes = document.querySelectorAll(selector);
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener(type, listener, capture);
        }
    }

    async function snapping(drag, first) {
        await get_data_modal();

        let grab = drag.querySelector(".grabme");
        grab.parentNode.removeChild(grab);
        let blockin = drag.querySelector(".blockin");
        blockin.parentNode.removeChild(blockin);
        if (drag.querySelector(".blockelemtype").value == "1") {
            drag.innerHTML += `<div class='blockyleft'><img src='assets/eyeblue.svg'><p class='blockyname'>${card.descricao}</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>${card.texto}</div>`;
        } else if (drag.querySelector(".blockelemtype").value == "2") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/actionblue.svg'><p class='blockyname'>Action is performed</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>Action 1</span> is performed</div>";
        } else if (drag.querySelector(".blockelemtype").value == "3") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/timeblue.svg'><p class='blockyname'>Time has passed</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>10 seconds</span> have passed</div>";
        } else if (drag.querySelector(".blockelemtype").value == "4") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/errorblue.svg'><p class='blockyname'>Error prompt</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>Error 1</span> is triggered</div>";
        } else if (drag.querySelector(".blockelemtype").value == "5") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/databaseorange.svg'><p class='blockyname'>New database entry</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Add <span>Data object</span> to <span>Database 1</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "6") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/databaseorange.svg'><p class='blockyname'>Update database</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Update <span>Database 1</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "7") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/actionorange.svg'><p class='blockyname'>Perform an action</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Perform <span>Action 1</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "8") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/twitterorange.svg'><p class='blockyname'>Make a tweet</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Tweet <span>Query 1</span> with the account <span>@alyssaxuu</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "9") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/logred.svg'><p class='blockyname'>Add new log entry</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Add new <span>success</span> log entry</div>";
        } else if (drag.querySelector(".blockelemtype").value == "10") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/logred.svg'><p class='blockyname'>Update logs</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Edit <span>Log Entry 1</span></div>";
        } else if (drag.querySelector(".blockelemtype").value == "11") {
            drag.innerHTML += "<div class='blockyleft'><img src='assets/errorred.svg'><p class='blockyname'>Prompt an error</p></div><div class='blockyright'><img src='assets/more.svg'></div><div class='blockydiv'></div><div class='blockyinfo'>Trigger <span>Error 1</span></div>";
        }
        return true;
    }

    function drag(block) {
        block.classList.add("blockdisabled");
        tempblock2 = block;

        hide_properties();

        if (document.getElementsByClassName("selectedblock").length > 0) {
            [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
        }
    }

    function release() {
        if (tempblock2) {
            tempblock2.classList.remove("blockdisabled");

            hide_properties();

            if (document.getElementsByClassName("selectedblock").length > 0) {
                [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
            }
        }
    }

    let disabledClick = function() {
        document.querySelector(".navactive").classList.add("navdisabled");
        document.querySelector(".navactive").classList.remove("navactive");
        this.classList.add("navactive");
        this.classList.remove("navdisabled");
        if (this.getAttribute("id") == "triggers") {
            document.getElementById("blocklist").innerHTML = '<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="1"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/eye.svg"></div><div class="blocktext">                        <p class="blocktitle">New visitor</p><p class="blockdesc">Triggers when somebody visits a specified page</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="2"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/action.svg"></div><div class="blocktext">                        <p class="blocktitle">Action is performed</p><p class="blockdesc">Triggers when somebody performs a specified action</p></div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="3"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/time.svg"></div><div class="blocktext">                        <p class="blocktitle">Time has passed</p><p class="blockdesc">Triggers after a specified amount of time</p>          </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="4"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/error.svg"></div><div class="blocktext">                        <p class="blocktitle">Error prompt</p><p class="blockdesc">Triggers when a specified error happens</p>              </div></div></div>';
        } else if (this.getAttribute("id") == "actions") {
            document.getElementById("blocklist").innerHTML = '<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="5"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/database.svg"></div><div class="blocktext">                        <p class="blocktitle">New database entry</p><p class="blockdesc">Adds a new entry to a specified database</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="6"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/database.svg"></div><div class="blocktext">                        <p class="blocktitle">Update database</p><p class="blockdesc">Edits and deletes database entries and properties</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="7"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/action.svg"></div><div class="blocktext">                        <p class="blocktitle">Perform an action</p><p class="blockdesc">Performs or edits a specified action</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="8"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/twitter.svg"></div><div class="blocktext">                        <p class="blocktitle">Make a tweet</p><p class="blockdesc">Makes a tweet with a specified query</p>        </div></div></div>';
        } else if (this.getAttribute("id") == "loggers") {
            document.getElementById("blocklist").innerHTML = '<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="9"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/log.svg"></div><div class="blocktext">                        <p class="blocktitle">Add new log entry</p><p class="blockdesc">Adds a new log entry to this project</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="10"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/log.svg"></div><div class="blocktext">                        <p class="blocktitle">Update logs</p><p class="blockdesc">Edits and deletes log entries in this project</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="11"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/error.svg"></div><div class="blocktext">                        <p class="blocktitle">Prompt an error</p><p class="blockdesc">Triggers a specified error</p>        </div></div></div>';
        }
    }

    function hide_properties() {
        rightcard = false;
        document.getElementById("properties").classList.remove("expanded");
        setTimeout(function() {
            document.getElementById("propwrap").classList.remove("itson"); 
        }, 300);
    }

    function show_properties() {
        rightcard = true;
        document.getElementById("properties").classList.add("expanded");
        document.getElementById("propwrap").classList.add("itson");
    }

    function rearrange(block, parent) {
        hide_properties();

        if (document.getElementsByClassName("selectedblock").length > 0) {
            [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
        }
    }

    addEventListenerMulti("click", disabledClick, false, ".side");

    document.getElementById("close").addEventListener("click", function() {
        if (rightcard) {
            hide_properties();

            if (document.getElementsByClassName("selectedblock").length > 0) {
                [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
            }
        } 
    });

    document.getElementById("closecard").addEventListener("click", function() {
        if (leftcard) {
            leftcard = false;
            document.getElementById("leftcard").classList.add("leftcard-hide");
            document.getElementById("header").classList.add("hide-element");
            document.getElementById("search").classList.add("hide-element");
            document.getElementById("search").classList.add("display-none");
            document.getElementById("subnav").classList.add("hide-element");
            document.getElementById("footer").classList.add("hide-element");
            document.getElementById("canvas").classList.add("canvas-expand");
            setTimeout(function() {
                document.getElementById("closecard").classList.add("closecard-collapsed");
                document.getElementById("closecard").classList.remove("closecard-collapsed-0");
                document.getElementById("closecard").classList.add("closecard-collapsed-180");
            }, 100);

            if (document.getElementsByClassName("selectedblock").length > 0) {
                [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
            }
        } else {
            leftcard = true;
            document.getElementById("leftcard").classList.remove("leftcard-hide");
            document.getElementById("header").classList.remove("hide-element");
            document.getElementById("search").classList.remove("hide-element");
            document.getElementById("search").classList.remove("display-none");
            document.getElementById("subnav").classList.remove("hide-element");
            document.getElementById("footer").classList.remove("hide-element");
            document.getElementById("canvas").classList.remove("canvas-expand");
            setTimeout(function() {
                document.getElementById("closecard").classList.remove("closecard-collapsed");
                document.getElementById("closecard").classList.remove("closecard-collapsed-180");
                document.getElementById("closecard").classList.add("closecard-collapsed-0");
            }, 100);
        }
    });

    document.getElementById("removeblock").addEventListener("click", function() {
        hide_properties();
        deletar = document.querySelector("div.selectedblock > input.blockid"); 
        flowy.deleteBlock(deletar ? deletar.value : '');
    });

    let aclick = false;
    let noinfo = false;
    let beginTouch = function (event) {
        aclick = true;
        noinfo = false;
        if (event.target.closest(".create-flowy")) {
            noinfo = true;
        }
    }

    let checkTouch = function (event) {
        aclick = false;
    }

    let doneTouch = function (event) {
        if (event.type === "mouseup" && aclick && !noinfo) {
            if (!rightcard && event.target.closest(".block") && !event.target.closest(".block").classList.contains("dragging")) {
                tempblock = event.target.closest(".block");
                show_properties();
                tempblock.classList.add("selectedblock");
            } else if (rightcard && event.target.closest(".block") && !event.target.closest(".block").classList.contains("dragging")) {
                tempblock = event.target.closest(".block");
                hide_properties();

                if (document.getElementsByClassName("selectedblock").length > 0) {
                    [document.getElementsByClassName("selectedblock")].map((index) => {index[0].classList.remove("selectedblock")});
                }
            }
        }
    }

    addEventListener("mousedown", beginTouch, false);
    addEventListener("mousemove", checkTouch, false);
    addEventListener("mouseup", doneTouch, false);
    addEventListenerMulti("touchstart", beginTouch, false, ".block");

    async function get_data_modal() {
        $('#modal').modal('show');
        return await new Promise(resolve => 
            $('#modal').on('hidden.bs.modal', function () {
                if (document.getElementById('descricao-card').value && document.getElementById('texto-card').value) {
                    card.descricao = document.getElementById('descricao-card').value;
                    card.texto = document.getElementById('texto-card').value;
                    document.getElementById('descricao-card').value = '';
                    document.getElementById('texto-card').value = '';
                } else {
                    aux = document.getElementsByClassName('block');
                    deletar = aux[aux.length - 1].children['blockid'];
                    flowy.deleteBlock(deletar ? deletar.value : '');
                }
                $('#modal').off('hidden.bs.modal');
                resolve();
            })
        );
    }
});