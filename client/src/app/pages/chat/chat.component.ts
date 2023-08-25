import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  /* public roomId: string
  public messageText: string
  public messageArray: {user: string, message: string}[] = []

  public phone: string
  public currentUser: string
  public selectedUser: object

  public userList = [
    {
      id: 1,
      name: 'Shai',
      phone: '123456789',
      image: '../../../assets/userIcon.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Colo',
      phone: '987654321',
      image: '../../../assets/userIcon.png'
      ,
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },
    {
      id: 3,
      name: 'Furman',
      phone: '1717171717',
      image: '../../../assets/userIcon.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6'
      }
    },
    {
      id: 4,
      name: 'Chaplin',
      phone: '999999999',
      image: '../../../assets/userIcon.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6'
      }
    },
  ] */

  constructor(private chatService: ChatService) {
    /* this.chatService.getMessage()
      .subscribe((data: {user: string, message: string}) => {
        this.messageArray.push(data)
      }) */
  }

 /*  selectedUserHandler(phone: string):void {
    this.selectedUser = this.userList.find(user => user.phone === phone)
    this.roomId = this.selectedUser.roomId(this.selectedUser.id)
    this.messageArray = []
  } */

}
