import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "bl-terminal-home",
    templateUrl: "terminal-home.html",
})
export class TerminalHomeComponent {
    public static breadcrumb() {
        return { name: "SSH" };
    }
    public pickedPool = new FormControl(null);

    constructor( ) {
        console.log("hello world");
        let SSH = require("simple-ssh");
        let ssh = new SSH({
            host: "52.170.30.72",
            user: "xibfym",
            pass: "!)nTgp37,,P_~#7",
            port: "50001",
        });
        console.log(ssh);
        ssh.exec("echo $PATH && pwd && ls && hostname", {
            out: function (stdout) {
                console.log(stdout);
            },
        }).start();
    }

}
