import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NodeService } from "app/services";

@Component({
    selector: "bl-terminal-home",
    templateUrl: "terminal-home.html",
})
export class TerminalHomeComponent implements OnInit {
    public static breadcrumb() {
        return { name: "SSH" };
    }
    public pickedPool = new FormControl(null);
    public form: FormGroup;
    public data;

    constructor(public formBuilder: FormBuilder,
                private nodeService: NodeService) {
        this.form = new FormGroup({});
/*
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

        this.route.queryParams.subscribe(params => {
            console.log(params);
        });
*/
        this.pickedPool.valueChanges.distinctUntilChanged()
            .subscribe((query: string) => {
                console.log(this.nodeService.list(this.pickedPool.value));
            });
    }

    public ngOnInit() {
        this.form = this.formBuilder.group({ poolpicker: this.pickedPool });
    }

}
