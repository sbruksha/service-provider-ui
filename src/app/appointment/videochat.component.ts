import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';
import { AppState }               from '../app.service';
import { AppointmentService }     from '../api/api/appointment.service';
import * as io                    from 'socket.io-client';
import * as Peer                  from 'simple-peer';
import * as getUserMedia          from 'getusermedia';

@Component({
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.scss']
})

export class VideochatComponent implements OnInit {

  public readyToSend: boolean = false;
  public yourStream: any;

  constructor(
    private _state: AppState,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/attendance']);
    }

    // Set up page
    this._state.isSubPage.next(false);
    this._state.title.next('Video Chat');
    this._state.actions.next();
    this._state.primaryAction.next({
      icon: 'person_add',
      routerLink: 'appointment/walk-in-check-in'
    });

    // Retrieve video id
    let param: string = this.route.snapshot.params['id'];
    this.initVideo(param);
  }

  public initVideo(room: string) {
    if (true) {

      let socket = io.connect('https://eodessa-cti.herokuapp.com/');

      socket.on('connect', () =>  {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', { room_name: room });

        console.log('room ' + room);

        let init = () => {
          console.log('reinit');
          getUserMedia({video: true, audio: false},  (err, stream) => {
            if (err) {
              return console.error(err);
            }
            socket.emit('ready');
            console.log('ready to go');

            let peer = null;
            let user;
            socket.on('init', (initiator) => {
              console.log('init peer');

              // peer = (function () {
              //   return function () {
              //     new Peer({initiator: initiator, trickle: false, stream: stream});
              //   }
              // })();

              // Start usercam
              let video = document.createElement('video');
              document.getElementsByClassName('you')[0].appendChild(video);
              this.yourStream = stream;
              video.src = window.URL.createObjectURL(stream);
              video.setAttribute('style', 'width:170px;margin-left:-10px');
              video.play();

              user = (initiator === true) ? 'user1' : 'user2';

              // peer.on('signal', function (data) {
              //   console.log("recived your("+user+") signal",data);
              //   socket.emit("sendSignal",JSON.stringify(data));
              // });
              // peer.on('connect', function () {
              //   peer.send("hello world");
              // });
              /*
               socket.on('cancelCall',function(sig) {
               console.log("destrop peer");
               peer.destroy();
               peer = null;
               init();
               });*/

              // peer.on('close', () => {
              //   console.log("peer closed");
              //   peer.destroy();
              //   peer = null;
              //   init();
              // });
              socket.on('reciveSignal', (sig) => {
                let other = ( user === 'user1' ) ? 'user2' : 'user1';
                console.log('Connect to ' + other, sig);
                // peer.signal(sig);
                if (user === 'user1') {

                  setTimeout( () => {
                    this.readyToSend = true;

                  }, 200);
                }
              });

              // peer.on('data', function (data) {
              //   console.log(data);
              // });
              //
              // peer.on('stream', function (stream) {
              //   document.getElementsByClassName('display')[0].className = "display active";
              //
              //   ///
              //   var video = document.createElement('video');
              //   document.getElementsByClassName('screenContainer')[0].appendChild(video);
              //
              //   //document.getElementsByClassName('status')[0].innerHTML='Samtal startat';
              //   video.src = window.URL.createObjectURL(stream);
              //   video.play();
              //
              // });
            });
          });

        };
        init();
      });

    }

  }

}
