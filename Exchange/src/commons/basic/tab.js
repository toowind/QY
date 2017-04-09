function SlideTab(id, fn) {
    this.target = $('#' + id);
    this.selectedTabIndex = 0;

    var datafor = '[data-for="' + id + '"]';

    this.labels = $(datafor).find('.tab-label');
    this.pages = $('#' + id).find('.tab-page');

    this.winWidth = $(window).width();

    init(this, fn);
}

var init = (ctx, fn) => {
    // ctx.pages.width(320);
    ctx.labels.click((e) => {
        var index = 0;
        if (e.target.tagName === "A") {
            index = parseInt($(e.target).parent().attr('data-i'));
        } else {
            index = parseInt($(e.target).attr('data-i'));
        }
        e.dataIndex = index;
        e.oldScrollLeft = ctx.target.scrollLeft();
        e.newScrollLeft = index * ctx.winWidth;


        slide(ctx, e, fn);
    });

    var tabcontent = ctx.target.find('.tab-content');

    ctx.pages.scroll((e) => {
        var scroLeft = ctx.target.scrollLeft();
        var i = Math.round(scroLeft / ctx.winWidth);
        e.dataIndex = i;
        e.oldScrollLeft = scroLeft;
        e.newScrollLeft = (i - 1) * ctx.winWidth;
        console.log(scroLeft);
        slide(ctx, e, fn);
    });
    // tabcontent.on('click', (e) => {
    //     console.log(e);
    // });
    // var startX = 0,
    //     startY = 0,
    //     endX = 0,
    //     endY = 0,
    //     offX = 0,
    //     offY = 0;
    // ctx.pages.on('touchstart', (e) => {
    //     console.log(e);
    //     var touch = event.targetTouches[0];
    //     startX = touch.pageX;
    //     startY = touch.pageY;
    // });
    // ctx.pages.on('touchmove', (e) => {
    //     console.log(e);
    //     var touch = event.targetTouches[0];
    //     endX = touch.pageX;
    //     endY = touch.pageY;
    // });

    // ctx.pages.on('touchend', (e) => {
    //     console.log(e);
    //     offX = endX - startX;
    //     offY = endY - startY;
    //     console.log(offX);
    //     console.log(offX);
    // });
}

var selectTabLabel = (ctx, e) => {
    ctx.labels.eq(e.dataIndex).addClass('active');
    ctx.labels.eq(ctx.selectedTabIndex).removeClass('active');
    ctx.selectedTabIndex = e.dataIndex;
}

var selectTabContent = (ctx, e) => {
    ctx.target.scrollLeft(e.newScrollLeft);
}

var slide = (ctx, e, fn) => {
    if (e.dataIndex === undefined || ctx.selectedTabIndex === e.dataIndex) {
        return;
    }
    selectTabLabel(ctx, e);
    selectTabContent(ctx, e);
    ctx.selectedTabIndex = e.dataIndex;
    fn(e);
}



export default SlideTab;
