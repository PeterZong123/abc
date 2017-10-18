import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

class Paging{
    public startIndex:Number;
    public endIndex:Number;
    public totalCount:Number;
    public currentPage:Number;
    public countPerPage:Number;
    public totalPage:Number
    public dispBtns:Array<any>;
    constructor()   {
        this.startIndex = 0;
        this.endIndex = 0;
        this.currentPage = 1;
        this.countPerPage = 10;
        this.totalCount = 100;
        this.totalPage = 0;
        this.dispBtns = [];
    }
}


@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

    @Input()
    public countPerPage:Number;
    @Input()
    public totalCount:Number;
    @Input()
    public inputCurrentPage:Number;

    @Output()
    public goPage:EventEmitter<any> = new EventEmitter<string>();

    public pagingInfo:Paging;

    constructor() {
        this.pagingInfo = new Paging();
    }

    ngOnChanges(){
        this.pagingInfo.totalCount = this.totalCount == 0 ? 0 :  Number(this.totalCount) || this.pagingInfo.totalCount;
        this.pagingInfo.countPerPage = this.countPerPage== 0 ? 0 : Number(this.countPerPage) || this.pagingInfo.countPerPage;
        this.pagingInfo.currentPage = Number(this.inputCurrentPage) || this.pagingInfo.currentPage;
        this.pagingInfo = reloadPageingInfo(this.pagingInfo)
    }

    ngOnInit() {
        this.pagingInfo.totalCount = this.totalCount == 0 ? 0 :  Number(this.totalCount) || this.pagingInfo.totalCount;
        this.pagingInfo.countPerPage = this.countPerPage== 0 ? 0 : Number(this.countPerPage) || this.pagingInfo.countPerPage;
        this.pagingInfo = reloadPageingInfo(this.pagingInfo)
    }
    gotoPage(dispBtn){
        /*console.log(dispBtn);*/
        switch (dispBtn){
            case '上一页':
                this.pagingInfo.currentPage = Number(this.pagingInfo.currentPage) - 1;
                reloadPageingInfo(this.pagingInfo);
                this.goPage.emit(this.pagingInfo);
                break;
            case '下一页':
                this.pagingInfo.currentPage = Number(this.pagingInfo.currentPage) + 1;
                reloadPageingInfo(this.pagingInfo);
                this.goPage.emit(this.pagingInfo);
                break;
            case '...':
                break;
            default:
                this.pagingInfo.currentPage = dispBtn;
                reloadPageingInfo(this.pagingInfo);
                this.goPage.emit(this.pagingInfo);
                break;
        }

    }

}

function reloadPageingInfo(pageingInfo){

    //计算总页数
    var pageNum =  parseInt(pageingInfo.totalCount/pageingInfo.countPerPage + '');
    if(pageingInfo.totalCount%pageingInfo.countPerPage){
        pageNum++;
    }
    pageingInfo.totalPage = pageNum;

    //计算当前页的开始和结束数字。
    if(pageingInfo.totalPage == 0){
        pageingInfo.startIndex = 0;
        pageingInfo.endIndex = 0;
    }else{
        pageingInfo.startIndex = 1 + pageingInfo.countPerPage * (pageingInfo.currentPage - 1);
        if(pageingInfo.currentPage === pageingInfo.totalPage){
            pageingInfo.endIndex = pageingInfo.totalCount;
        }else{
            pageingInfo.endIndex = pageingInfo.startIndex + pageingInfo.countPerPage - 1;
        }
    }


    //计算分页显示的按钮值。
    var dispBtn = [];
    if(pageNum<=7){
        for(var i = 1; i<=pageNum; i++){
            dispBtn.push(i);
        }
        pageingInfo.dispBtns = dispBtn;
    }else{

        if(pageingInfo.currentPage === 1){//当前为第一页
            dispBtn = [1,2,3,'...',pageingInfo.totalPage,'下一页']
        }else if(pageingInfo.currentPage === pageingInfo.totalPage){//当前为最后一页
            dispBtn = ['上一页',1,'...',pageingInfo.totalPage-2,pageingInfo.totalPage-1,pageingInfo.totalPage]
        }else if(pageingInfo.currentPage <= 4){//显示前面几页
            dispBtn.push('上一页');
            for(var i = 1; i<= pageingInfo.currentPage;i++){
                dispBtn.push(i);
            }
            dispBtn.push(pageingInfo.currentPage + 1);
            dispBtn.push(pageingInfo.currentPage + 2);
            dispBtn.push('...');
            dispBtn.push(pageingInfo.totalPage);
            dispBtn.push('下一页')
        }else if(pageingInfo.currentPage + 4 > pageingInfo.totalPage){//显示后面几页
            dispBtn.push('上一页');
            dispBtn.push(1);
            dispBtn.push('...');
            dispBtn.push(pageingInfo.currentPage - 2);
            dispBtn.push(pageingInfo.currentPage - 1 );
            for(var i = Number(pageingInfo.currentPage + ''); i<=pageingInfo.totalPage; i++){
                dispBtn.push(i);
            }
            dispBtn.push('下一页');
        }else{//显示中间页面
            dispBtn.push('上一页');
            dispBtn.push(1);
            dispBtn.push('...');
            for(var i = pageingInfo.currentPage-2; i<=pageingInfo.currentPage + 2; i++){
                dispBtn.push(i);
            }
            dispBtn.push('...');
            dispBtn.push(pageingInfo.totalPage);
            dispBtn.push('下一页');
        }


        pageingInfo.dispBtns = dispBtn;
    }

    return pageingInfo;
}
