
let Helper = {
    GetCallasync: (url, success, error) => {
        $.get({
            url: url,
            async: true,
            cache: false,
            success: (data) => {
                success(data);
                return data;
            }, error: (err) => {
                error(err);
                return 0;
            }
        });
    },
    GetCallPromiseasync: (url) => {
        return new Promise((resolve, reject) => {
            $.get({
                url: url,
                cache: false,
                success: (result) => resolve(result),
                error: (err) => reject(err)
            });
        });
    },
    GetCallasyncPromise: (url) => {
        return new Promise((resolve, reject) => {
            $.get({
                url: url,
                async: true,
                cache: false,
                success: resolve,
                error: reject
            });
        });
    },
    PostCallasync: (object, success, error) => {
        $.post({
            url: object.url,
            data: object.paramters,
            headers: {
                "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
            },
            async: true,
            cache: false,
            success: (data) => {
                success(data);
                return data;
            }, error: (err) => {
                error(err);
                return 0;
            }
        });
    },
    PostCallasyncFormData: (object, success, error) => {
        $.post({
            url: object.url,
            data: object.paramters,
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            success: (data) => {
                success(data);
            }, error: (err) => {
                error(err);
            }
        });
    },
    PostCallasyncFiles: async (object, success, error) => {
        try {
            //console.log(object.paramters);
            const response = await fetch(object.url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: object.paramters
            });

            if (!response.ok) {
                const errJson = await response.json();
                if (error) error({ responseJSON: errJson });
                return;
            }

            const disposition = response.headers.get('Content-Disposition');
            const fileName = disposition && disposition.includes("filename*=")
                ? decodeURIComponent(disposition.split("filename*=UTF-8''")[1])
                : '';

            if (fileName == '')
                if (error) error({ responseJSON: { title: "ÎØÃ İí ÇáÇÊÕÇá", body: "ÊÚĞÑ ÊÍãíá Çáãáİ. íÑÌì ÇáãÍÇæáÉ áÇÍŞğÇ." } });

            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);

            if (typeof (success) === "function") {
                success();
            }
            return;

        } catch (err) {
            console.error(err);
            if (typeof (error) === "function") {
                error({ responseJSON: { title: "ÎØÃ İí ÇáÇÊÕÇá", body: "ÊÚĞÑ ÊÍãíá Çáãáİ. íÑÌì ÇáãÍÇæáÉ áÇÍŞğÇ." } });
            }
        }
    },
    PostJsonAsync: (url, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errJson = await response.json().catch(() => ({}));
                    reject(errJson);
                    return;
                }

                const result = await response.json().catch(() => null);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    },
    PostCallJsonAsync: (url, parameters) => {
        return new Promise((resolve, reject) => {
            $.post({
                url: url,
                data: parameters,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                cors: true,
                secure: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    },
    PostCallTextAsync: (url, parameters) => {
        return new Promise((resolve, reject) => {
            $.post({
                url: url,
                data: parameters,
                contentType: 'application/json; charset=utf-8',
                dataType: 'text',
                async: true,
                cache: false,
                cors: true,
                secure: true,
                processData: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }
}
