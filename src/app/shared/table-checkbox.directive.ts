import {Directive, OnInit, HostListener, NgZone, Output, EventEmitter} from '@angular/core';
declare var $: any;
/**
 * Allows the aside to be toggled via click.
 * Author by liangzhifeng
 */
@Directive({
  selector: '[appTableCheckbox]',
})
export class TableCheckboxDirectice implements OnInit{
  @Output() onChecked = new EventEmitter<Array<number>>();

  arrChecked: Array<number> = [];
  constructor(private zone : NgZone) {
    this.zone.onMicrotaskEmpty.subscribe(() => this.zone.run(() => this.tick()));
    console.log('TableCheckboxDirectice zone running');
  }

  initTableCheckbox() {
    const $tbr = $('#checkboxTable tbody tr ');
    if ($tbr.length > 0 && $('table tbody tr').find('input').length <= 0){
      const $thr = $('#checkboxTable thead tr');
      const $checkAllTh = $('<th><input type="checkbox" id="checkAll" name="checkAll" /></th>');
      /*将全选/反选复选框添加到表头最前，即增加一列*/
      if ($('#checkboxTable thead tr').find('#checkAll').length <= 0){
        $thr.prepend($checkAllTh);
        /*点击全选框所在单元格时也触发全选框的点击操作*/
        $checkAllTh.click(function(){
          $(this).find('input').click();
        });
      }

      /*“全选/反选”复选框*/
      const $checkAll = $thr.find('input');
      $checkAll.click(function(event){
        /*将所有行的选中状态设成全选框的选中状态*/
        $tbr.find('input').prop('checked', $(this).prop('checked'));
        /*并调整所有选中行的CSS样式*/
        if ($(this).prop('checked')) {
          $tbr.find('input').parent().parent().addClass('warning');
        } else{
          $tbr.find('input').parent().parent().removeClass('warning');
        }
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
      });

      const $checkItemTd = $('<td><input type="checkbox" name="checkItem" /></td>');
      /*每一行都在最前面插入一个选中复选框的单元格*/
      // if($('table tbody tr').find('input').length <= 0){
        $tbr.prepend($checkItemTd);
        /*点击每一行时也触发该行的选中操作*/
        $tbr.click(function(){
          $(this).find('input').click();
        });
      // }

      /*点击每一行的选中复选框时*/
      $tbr.find('input').click(function(event){
        /*调整选中行的CSS样式*/
        $(this).parent().parent().toggleClass('warning');
        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/
        $checkAll.prop('checked', $tbr.find('input:checked').length === $tbr.length ? true : false);
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
      });

    }

  }

  tick(){
    console.log('TableCheckboxDirectice tick running');
    this.initTableCheckbox();
  }

  ngOnInit() {
    console.log('TableCheckboxDirectice ngOnInit running');
  }


  @HostListener('change')
  change(){
    console.log('TableCheckboxDirectice change run');
    this.arrChecked = [];
    let i = 0;
    const checkAll = $('table thead tr input').prop('checked');
    const checkItems = $('table tbody tr input');
    for (const checkItem of checkItems){
      if (checkItem.checked){
        this.arrChecked.push(i);
      }
      i++;
    }
    console.log(this.arrChecked);
    if (checkAll) {
      console.log('all checked');
    }
    this.onChecked.emit(this.arrChecked);
  }
}
