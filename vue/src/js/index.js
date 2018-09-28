window.onload = function(){
    /*
    false-------未完成
    true-------完成
    0---------不显示
    1---------不显示
    */
    let data = [
        // {
        //     content: '学习操作系统!',
        //     type: false,
        //     status: 1
        // },
        // {
        //     content: '学习微机原理',
        //     type: false,
        //     status: 1
        // },
        // {
        //     content: '学习编译原理',
        //     type: false,
        //     status: 1
        // },
        // {
        //     content: '学习专业英语',
        //     type: true,
        //     status: 1
        // },
        // {
        //     content: '学习UML',
        //     type: false,
        //     status: 1
        // }
    ];

    var vm = new Vue({
        el: '#app',
        data: {
            list: data,
            checked: true
        },
        computed: {
            len() {
                return this.list.filter((item) => item.type === false).length;
            }
        },
        methods: {
            sendHandle(e) {
                if (e.keyCode === 13 && e.target.value !== '') {
                    this.list.push({
                        content: e.target.value,
                        type: false,
                        status: 1
                    });
                    e.target.value = '';
                }
            },
            sendChecked(e, i) {
                this.list[i].type = !this.list[i].type;
            },
            delHandle(i) {
                this.list.splice(i, 1);
            },
            allHandle() {
                this.list.forEach(function(item, index, input){
                    input[index].status = 1;
                });            },
            activeHandle() {
                this.list.forEach(function(item, index, input){
                    if(!item.type){
                        input[index].status = 1;
                    }else{
                        input[index].status = 0;
                    }
                });
            },
            completedHandle() {
                this.list.forEach(function(item, index, input){
                    if(!item.type){
                        input[index].status = 0;
                    }else{
                        input[index].status = 1;
                    }
                });
            },
            clearHandle() {
                this.list = [];
            },
            edit(e, index) {
                let content = e.target.innerText;
                e.target.style.display = 'none';
                let input = document.createElement('input');
                e.target.parentNode.appendChild(input);
                input.value = content;
                input.className = 'edit';
                let m = this;
                input.onkeydown = function(event) {
                    if (event.keyCode === 13) {
                        m.list[index].content = event.target.value;
                        event.target.style.display = 'none';
                        e.target.style.display = 'inline-block';
                    }
                }
            }
        }
    })
};
