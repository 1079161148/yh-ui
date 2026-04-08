export interface Language {
    name: string;
    el: {
        colorpicker: {
            confirm: string;
            clear: string;
        };
        datepicker: {
            now: string;
            today: string;
            cancel: string;
            clear: string;
            confirm: string;
            selectDate: string;
            selectTime: string;
            startDate: string;
            startTime: string;
            endDate: string;
            endTime: string;
        };
        transfer: {
            noMatch: string;
            noData: string;
            titles: [string, string];
            filterPlaceholder: string;
            noCheckedFormat: string;
            hasCheckedFormat: string;
        };
        table: {
            emptyText: string;
            confirmFilter: string;
            resetFilter: string;
            clearFilter: string;
            sumText: string;
        };
        messagebox: {
            title: string;
            confirm: string;
            cancel: string;
            error: string;
        };
        upload: {
            deleteTip: string;
            delete: string;
            preview: string;
            continue: string;
        };
    };
}
export declare const zhCn: Language;
export declare const en: Language;
