export interface Language {
    name: string;
    yh?: Partial<{
        common: {
            yes: string;
            no: string;
            confirm: string;
            cancel: string;
            loading: string;
            close: string;
            clear: string;
            reset: string;
            save: string;
            delete: string;
            edit: string;
            add: string;
            search: string;
            refresh: string;
            expand: string;
            collapse: string;
            more: string;
            noData: string;
            noMatch: string;
            selectAll: string;
            unselectAll: string;
        };
        colorpicker: {
            confirm: string;
            clear: string;
            eyeDropper: string;
            suggestionDark: string;
            suggestionLight: string;
            recentColors: string;
            presetColors: string;
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
            year: string;
            month: string;
            day: string;
            week: string;
            monthBeforeYear: boolean;
            prevYear: string;
            nextYear: string;
            prevMonth: string;
            nextMonth: string;
            weeks: {
                sun: string;
                mon: string;
                tue: string;
                wed: string;
                thu: string;
                fri: string;
                sat: string;
            };
            months: {
                jan: string;
                feb: string;
                mar: string;
                apr: string;
                may: string;
                jun: string;
                jul: string;
                aug: string;
                sep: string;
                oct: string;
                nov: string;
                dec: string;
            };
            quarters: {
                q1: string;
                q2: string;
                q3: string;
                q4: string;
            };
        };
        timepicker: {
            confirm: string;
            cancel: string;
            now: string;
            placeholder: string;
            startPlaceholder: string;
            endPlaceholder: string;
            selectTime: string;
        };
        timeselect: {
            placeholder: string;
        };
        tree: {
            emptyText: string;
            loading: string;
            checkAll: string;
            uncheckAll: string;
            expandAll: string;
            collapseAll: string;
        };
        treeselect: {
            placeholder: string;
            emptyText: string;
            loading: string;
            noMatch: string;
        };
        calendar: {
            prevMonth: string;
            nextMonth: string;
            prevYear: string;
            nextYear: string;
            today: string;
            week: string;
            holiday: string;
            workday: string;
            monthHeaderFormat: string;
            weeks: {
                sun: string;
                mon: string;
                tue: string;
                wed: string;
                thu: string;
                fri: string;
                sat: string;
            };
        };
        autocomplete: {
            loading: string;
            placeholder: string;
            noData: string;
            noMatch: string;
        };
        countdown: {
            days: string;
            hours: string;
            minutes: string;
            seconds: string;
            milliseconds: string;
            finished: string;
        };
        cascader: {
            noMatch: string;
            placeholder: string;
            loading: string;
            noData: string;
        };
        transfer: {
            noMatch: string;
            noData: string;
            titles: [string, string];
            filterPlaceholder: string;
            noCheckedFormat: string;
            hasCheckedFormat: string;
            searchPlaceholder: string;
        };
        table: {
            emptyText: string;
            confirmFilter: string;
            resetFilter: string;
            clearFilter: string;
            sumText: string;
            loading: string;
            index: string;
            print: string;
            cancel: string;
            preview: string;
            printTime: string;
            total: string;
            page: string;
            yes: string;
            no: string;
            toolbar: {
                refresh: string;
                density: string;
                densityDefault: string;
                densityLarge: string;
                densitySmall: string;
                columnSetting: string;
                fullscreen: string;
                exitFullscreen: string;
                export: string;
                import: string;
                search: string;
                searchPlaceholder: string;
            };
            filter: {
                selectAll: string;
                selectInvert: string;
                empty: string;
                notEmpty: string;
                contains: string;
                notContains: string;
                equals: string;
                notEquals: string;
                startsWith: string;
                endsWith: string;
                greaterThan: string;
                lessThan: string;
                between: string;
            };
            sort: {
                asc: string;
                desc: string;
                clear: string;
            };
            export: {
                title: string;
                filename: string;
                type: string;
                scope: string;
                scopeAll: string;
                scopeSelected: string;
                scopeCurrentPage: string;
                includeHeader: string;
                exporting: string;
                success: string;
                error: string;
            };
            import: {
                title: string;
                selectFile: string;
                dragTip: string;
                importing: string;
                success: string;
                error: string;
                preview: string;
                confirm: string;
            };
            printConfig: {
                title: string;
                pageTitle: string;
                pageHeader: string;
                pageFooter: string;
                printAll: string;
                printSelected: string;
                printCurrentPage: string;
                landscape: string;
                portrait: string;
                printing: string;
            };
            columnSetting: {
                title: string;
                showAll: string;
                hideAll: string;
                reset: string;
                fixedLeft: string;
                fixedRight: string;
                unfixed: string;
            };
            contextMenu: {
                copy: string;
                copyRow: string;
                copyCell: string;
                paste: string;
                insertRowAbove: string;
                insertRowBelow: string;
                deleteRow: string;
                deleteSelectedRows: string;
                exportSelected: string;
            };
            selection: {
                selectAll: string;
                selectInvert: string;
                selectNone: string;
                selected: string;
            };
            expand: {
                expandAll: string;
                collapseAll: string;
            };
            tree: {
                expandAll: string;
                collapseAll: string;
                expandLevel: string;
            };
            drag: {
                dragTip: string;
                dropTip: string;
            };
        };
        messagebox: {
            title: string;
            confirm: string;
            cancel: string;
            close: string;
            error: string;
            alert: string;
            prompt: string;
            inputPlaceholder: string;
        };
        upload: {
            deleteTip: string;
            delete: string;
            preview: string;
            continue: string;
            upload: string;
            tip: string;
            dragTip: string;
            uploading: string;
            success: string;
            error: string;
            retry: string;
            cancel: string;
            fileTypeError: string;
            fileSizeError: string;
            fileCountError: string;
        };
        form: {
            validationFailed: string;
            required: string;
            pleaseInput: string;
            pleaseSelect: string;
        };
        button: {
            loading: string;
        };
        input: {
            placeholder: string;
            clear: string;
            showPassword: string;
            hidePassword: string;
            copy: string;
            copied: string;
        };
        inputnumber: {
            placeholder: string;
            increase: string;
            decrease: string;
        };
        inputtag: {
            placeholder: string;
            add: string;
            remove: string;
        };
        breadcrumb: {
            label: string;
            more: string;
        };
        backtop: {
            text: string;
        };
        select: {
            placeholder: string;
            noData: string;
            loading: string;
            noMatch: string;
            selectAll: string;
            clearAll: string;
        };
        pagination: {
            goto: string;
            page: string;
            total: string;
            pageSize: string;
            prev: string;
            next: string;
            first: string;
            last: string;
            pageClassifier: string;
        };
        popconfirm: {
            confirm: string;
            cancel: string;
            dontAskAgain: string;
        };
        dialog: {
            confirm: string;
            cancel: string;
            close: string;
            maximize: string;
            restore: string;
        };
        drawer: {
            close: string;
            confirm: string;
            cancel: string;
        };
        dropdown: {
            loading: string;
        };
        image: {
            error: string;
            loading: string;
            preview: string;
            zoomIn: string;
            zoomOut: string;
            rotateLeft: string;
            rotateRight: string;
            originalSize: string;
            fullscreen: string;
        };
        imageviewer: {
            close: string;
            prev: string;
            next: string;
            zoomIn: string;
            zoomOut: string;
            rotateLeft: string;
            rotateRight: string;
            reset: string;
            fullscreen: string;
            exitFullscreen: string;
        };
        infinitescroll: {
            loading: string;
            finished: string;
            error: string;
            retry: string;
        };
        message: {
            close: string;
        };
        notification: {
            close: string;
        };
        loading: {
            text: string;
        };
        spin: {
            text: string;
        };
        rate: {
            texts: [string, string, string, string, string];
        };
        alert: {
            close: string;
        };
        tag: {
            close: string;
        };
        tabs: {
            close: string;
            add: string;
            more: string;
        };
        steps: {
            finish: string;
            process: string;
            wait: string;
            error: string;
        };
        progress: {
            success: string;
            exception: string;
            warning: string;
        };
        skeleton: {
            loading: string;
        };
        empty: {
            description: string;
            noData: string;
            noResult: string;
            networkError: string;
            serverError: string;
        };
        result: {
            success: string;
            error: string;
            warning: string;
            info: string;
            backHome: string;
        };
        waterfall: {
            loading: string;
            noMore: string;
            empty: string;
        };
        descriptions: {
            colon: string;
        };
        slider: {
            tipFormatter: string;
        };
        switch: {
            on: string;
            off: string;
        };
        checkbox: {
            selectAll: string;
        };
        radio: {
            [key: string]: never;
        };
        menu: {
            collapse: string;
            expand: string;
        };
        card: {
            collapse: string;
            expand: string;
        };
        collapse: {
            expand: string;
            collapse: string;
        };
        tooltip: {
            [key: string]: never;
        };
        popover: {
            [key: string]: never;
        };
        badge: {
            [key: string]: never;
        };
        avatar: {
            error: string;
        };
        watermark: {
            [key: string]: never;
        };
        divider: {
            [key: string]: never;
        };
        carousel: {
            prev: string;
            next: string;
        };
        marquee: {
            [key: string]: never;
        };
        affix?: {
            [key: string]: never;
        };
        flow?: {
            zoomIn: string;
            zoomOut: string;
            fitView: string;
            lock: string;
        };
        anchor?: {
            [key: string]: never;
        };
        mention?: {
            placeholder: string;
            loading: string;
            noData: string;
        };
        skuselector?: {
            placeholder: string;
            emptyText: string;
            stock: string;
            price: string;
            selected: string;
            outOfStock: string;
        };
        productcard?: {
            viewDetails: string;
            buyNow: string;
            addToCart: string;
            sold: string;
        };
        price?: {
            original: string;
        };
        couponcard?: {
            available: string;
            used: string;
            expired: string;
            received: string;
            limit: string;
            noThreshold: string;
            validPeriod: string;
            ruleTitle: string;
        };
        luckydraw?: {
            start: string;
            drawing: string;
            end: string;
            retry: string;
        };
        filterbar?: {
            all: string;
            sort: string;
            filter: string;
            reset: string;
            confirm: string;
            noOptions: string;
            asc: string;
            desc: string;
            selected: string;
        };
        submitbar?: {
            total: string;
            selected: string;
            submit: string;
            allSelect: string;
        };
        categorynav?: {
            all: string;
            noData: string;
            loading: string;
        };
        smartaddress?: {
            placeholder: string;
            parse: string;
            province: string;
            city: string;
            district: string;
            street: string;
            detail: string;
            phone: string;
            name: string;
            parseSuccess: string;
            parseFailed: string;
            required: string;
            /** 识别关键词定义 */
            provinceKeywords: string[];
            cityKeywords: string[];
            districtKeywords: string[];
            streetKeywords: string[];
        };
        ai: {
            bubble?: {
                citations?: string;
            };
            mention?: {
                placeholder?: string;
                agent?: string;
                document?: string;
                table?: string;
                knowledge?: string;
            };
            codeBlock?: {
                copyCode?: string;
                copied?: string;
                run?: string;
                edit?: string;
                save?: string;
                cancel?: string;
            };
            codeRunner?: {
                run?: string;
                stop?: string;
                clear?: string;
                reset?: string;
                placeholder?: string;
            };
            sender?: {
                placeholder?: string;
                dragTip?: string;
            };
            thoughtChain?: {
                thoughtProcess?: string;
                thinking?: string;
                defaultTitle?: string;
                addNode?: string;
            };
            thinking?: {
                start?: string;
                thinking?: string;
                complete?: string;
                error?: string;
            };
            welcome?: {
                title?: string;
                description?: string;
            };
            action?: {
                copy?: string;
                regenerate?: string;
                share?: string;
                like?: string;
                dislike?: string;
                edit?: string;
                delete?: string;
            };
            artifacts?: {
                preview?: string;
                inline?: string;
                code?: string;
                versions?: string;
                rendering?: string;
                renderingChart?: string;
                renderingCanvas?: string;
            };
            voice?: {
                trigger?: string;
                listening?: string;
            };
            agent?: {
                uses?: string;
                use?: string;
                favorite?: string;
                unfavorite?: string;
                share?: string;
                online?: string;
                offline?: string;
                busy?: string;
                verified?: string;
                rating?: string;
                reviews?: string;
                responseTime?: string;
                ms?: string;
            };
            sources?: {
                references?: string;
                referencedSources?: string;
                relevant?: string;
                viewOriginal?: string;
                showAll?: string;
                more?: string;
                drawerTitle?: string;
                expandMore?: string;
                collapseMore?: string;
                noSources?: string;
                today?: string;
                last7Days?: string;
                last30Days?: string;
                earlier?: string;
                pinned?: string;
            };
            conversations?: {
                today?: string;
                last7Days?: string;
                last30Days?: string;
                earlier?: string;
                pinned?: string;
                pin?: string;
                unpin?: string;
                newConversation?: string;
                noData?: string;
                rename?: string;
                delete?: string;
                deleteConfirm?: string;
            };
            attachments?: {
                dropTip?: string;
                clickToUpload?: string;
                uploadSuccess?: string;
                uploadError?: string;
                deleteConfirm?: string;
                fileTooLarge?: string;
                invalidFileType?: string;
            };
            mermaid?: {
                image?: string;
                code?: string;
                zoomIn?: string;
                zoomOut?: string;
                reset?: string;
                download?: string;
                copyCode?: string;
                rendering?: string;
                renderError?: string;
                renderSuccess?: string;
                retry?: string;
            };
            canvas?: {
                reset?: string;
                zoom?: string;
                zoomIn?: string;
                zoomOut?: string;
                toggleGrid?: string;
                resetView?: string;
            };
        };
    }>;
}
export * from './lang/zh-cn';
export * from './lang/en';
export * from './lang/zh-tw';
export * from './lang/ja';
export * from './lang/ko';
export * from './lang/de';
export * from './lang/fr';
export * from './lang/es';
export * from './lang/pt';
export * from './lang/ru';
export * from './lang/ar';
export * from './lang/tr';
export * from './lang/it';
export * from './lang/nl';
export * from './lang/pl';
export * from './lang/th';
export * from './lang/vi';
export * from './lang/id';
export * from './lang/ms';
export * from './lang/da';
export * from './lang/sv';
export * from './lang/fi';
export * from './lang/no';
export * from './lang/nb-NO';
export * from './lang/cs';
export * from './lang/sk';
export * from './lang/uk';
export * from './lang/hu';
export * from './lang/ro';
export * from './lang/bg';
export * from './lang/az';
export * from './lang/pt-br';
export * from './lang/fa';
export * from './lang/hi';
export * from './lang/zh-hk';
export * from './lang/zh-mo';
export * from './lang/pa';
export * from './lang/el';
export * from './lang/ca';
export * from './lang/tk';
export * from './lang/ta';
export * from './lang/lv';
export * from './lang/af';
export * from './lang/et';
export * from './lang/sl';
export * from './lang/he';
export * from './lang/lo';
export * from './lang/lt';
export * from './lang/mn';
export * from './lang/kk';
export * from './lang/ku';
export * from './lang/ckb';
export * from './lang/ug-cn';
export * from './lang/km';
export * from './lang/sr';
export * from './lang/eu';
export * from './lang/ky';
export * from './lang/hy-am';
export * from './lang/hr';
export * from './lang/eo';
export * from './lang/bn';
export * from './lang/mg';
export * from './lang/sw';
export * from './lang/uz-uz';
export * from './lang/ar-eg';
export * from './lang/my';
export * from './lang/te';
