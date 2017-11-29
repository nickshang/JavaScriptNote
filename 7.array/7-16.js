define(["knockout", "Super", "Tools", "ko-datepicker", "ko-pages"], function (ko, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);
        self.wind = self.parent.wind;

        self._getForm = function () {
            return {
                studentId           : "",
                parentMobile        : "",
                createStartTime     : "",
                createEndTime       : "",
                salesRecord         : true,
                teacherRecord       : true,
                serviceRecord       : true,
                itRecord            : true,
                validTrue           : true,
                validFalse          : true,
                page                : 0
            };
        };

        self.form       = ko.observable(ko.mapping.fromJS(self._getForm()));
        self.traceList  = ko.observableArray([]);
        self.total      = ko.observable(0);

        self.verify = function (data,event) {
            var self = data;
            self.form().studentId(self.form().studentId().replace(/\s+/g,''));
            self.form().parentMobile(self.form().parentMobile().replace(/\s+/g,''));

            if (isNaN(self.form().studentId()) || isNaN(self.form().parentMobile())) {
                var target = event.currentTarget;
                self.sweet('Oops...', '学生ID或家长手机号只支持数字查找哦~~', 'error').then(function () {
                    target.focus();
                });
            }
        };

        self.search = function (page) {
            if (isNaN(self.form().studentId()) || isNaN(self.form().parentMobile())) {
                self.sweet('Oops...', '学生ID或家长手机号只支持数字查找哦~~', 'error');
                return;
            }
            Tools.ajax({
                url    : "/trace/search.vpage",
                data   : ko.mapping.toJS(self.form()),
                success: function (returnData) {
                    if (returnData.success) {
                        ko.utils.arrayForEach(returnData.data.tracePage.content, function (obj) {
                            obj.validRecords = JSON.parse(obj.validRecords);
                            obj.showrecords = false;
                            obj.week = Tools.Strftime(new Date(obj.date),'%W');
                        });

                        self.form().page(returnData.data.tracePage.number);
                        self.total(returnData.data.tracePage.totalPages);
                        self.traceList(ko.mapping.fromJS(returnData.data.tracePage.content)());
                    }
                }
            });
        };

        if (context.info != "null") {
            self.form().studentId(context.info);
            self.search(0);
        }

        self.showMobile = function () {
            var target = this;
            Tools.ajax({
                url    : "/trace/checkMobile.vpage",
                data   : {
                    parentId: target.parentId()
                },
                success: function (returnData) {
                    console.info('info',returnData);

                    if (returnData.success) {
                        target.mobile(returnData.data.mobile);
                    }
                }
            });
        };

        self.makeAnRecord = function (isValid) {
            var target = this;
            self.sweet({
                title               : "原因",
                input               : 'textarea',
                confirmButtonText   : '<i class="checkmark icon"></i>提交',
                cancelButtonText    : '<i class="remove icon"></i>取消',
                showCancelButton    : true
            }).then(function(text) {
                if (text) {
                    Tools.ajax({
                        url    : "/trace/setValid.vpage",
                        data   : {
                            id      : target.id(),
                            reason  : text,
                            isValid : isValid
                        },
                        success: function (returnData) {
                            console.info(returnData);

                            if (returnData.success) {
                                self.sweet("", "设置成功", "success");
                                target.valid(isValid ? 1 : 0);
                                target.validRecords(ko.mapping.fromJS(JSON.parse(returnData.data.validRecord))());
                            }
                        }
                    });

                    self.sweet.close();
                }
            });
        };

        $("body").one("pageReady", function () {
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    self.search(0);
                }
            });
        });

        if (self.data.test) {
            list = self;
        }
    };
});
