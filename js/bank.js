
var SheetID = "1TSSx_tTa_gbzimcraHO0eP3ZoOkGKjyOBg3oJLuDmmQ";
var range = "deposit!A:AA";

var logoURL = "http://www.jchs.harvard.edu/sites/jchs.harvard.edu/files/harvard_jchs_logo_2017.png";

var ref_data = [];
var selected_data = [];

var hFormat = Highcharts.numberFormat;

/*~~~~~~ Document ready function ~~~~~~~~~~~~~~~~~*/
$(document).ready(function () {

    /*~~~~~~~~ Google Sheet API request ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var API_Key = "AIzaSyDY_gHLV0A7liVYq64RxH7f7IYUKF15sOQ";
    var API_params = "valueRenderOption=UNFORMATTED_VALUE";
    var requestURL = "https://sheets.googleapis.com/v4/spreadsheets/" + SheetID + "/values/" + range + "?key=" + API_Key + "&" + API_params;

    $.get(requestURL, function (obj) {
        console.log(requestURL);

        ref_data = obj.values.slice(1);

        createSearchBox(ref_data, 'test');
        createSearchBox(ref_data, 'test2', 'Select comparison metro...');
        createChart('009 彰化商業銀行');

        $('#search_test').val('009 彰化商業銀行');

    }); //end get

}); // end document.ready

/*~~~~~~ Create the Chart ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function createChart(selected_location, selected_location2) {

    /*~~~~~~~~ Build Chart Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    if (selected_location2 === selected_location) {
        selected_location2 = '';
    }

    ref_data.forEach(function (el) {
        if (selected_location === el[0]) {
            selected_data = [
                {
                    name: '存款<br/>' + selected_location,
                    data: el.slice(14),
                    stack: selected_location
                },

                {
                    name: '放款<br/>' + selected_location,
                    data: el.slice(1, 14),
                    stack: selected_location
                }];

            //end selected_data
        } // end if
    }); //end forEach


    ref_data.forEach(function (el) {
        if (selected_location2 === el[0]) {
            selected_data.push(
                {
                    name: '存款<br/>' + selected_location2,
                    data: el.slice(14),
                    stack: selected_location2
                },

                {
                    name: '放款<br/>' + selected_location2,
                    data: el.slice(1, 14),
                    stack: selected_location2
                });

            // end selected_data.push
        } // end if
    }); //end forEach


    /*~~~~~~~~ Begin Chart Code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    chart = Highcharts.chart("container", {
        chart: {
            type: "column",
            animation: "true",
            marginTop: 35,
            events: {
                load: function () {
                    this.renderer.
                        image(logoURL, 0, this.chartHeight - 50, 170, 55).
                        add();
                }
            }
        },



        title: { text: null },

        subtitle: {
            //use subtitle element for table notes
            text: 'Notes: Moderately (severely) cost-burdened households pay 30–50% (more than 50%) of income for housing. Households with zero or negative income are assumed to have severe burdens, while households paying no cash rent are assumed to be without burdens.<br/>Source: JCHS tabulations of US Census Bureau, 2016 American Community Survey 1-year Estimates.',
            widthAdjust: -170,
            align: 'left',
            x: 160,
            y: -12,
            verticalAlign: 'bottom',
            style: {
                color: '#999999',
                fontSize: '9px'
            }
        },



        credits: { enabled: false },

        series: selected_data,

        xAxis: {
            title: {
                text: 'Household Income'
            },

            categories: [
                '100年',
                '101年',
                '102年',
                '103年',
                '104年',
                '105年',
                '106年',
                '107年',
                '108年',
                '109年',
                '110年',
                '111年',
                '112年'],

            plotLines: [{
                value: 4.5,
                width: 2,
                color: '#998b7d'
            }]
        },



        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 30000000,
            title: {
                text: "Share of Households (Percent)",
                offset: -140,
                x: 37,
                y: -12,
                align: 'high',
                rotation: 0,
                style: {
                    whiteSpace: 'nowrap'
                }
            },


            reversedStacks: false
        },


        colors: ['#6BA2B8', '#A0C3D1', '#E9C002', '#F5E28C'],

        /*~~~~~~~~~~~~~~ Custom tooltip content ~~~~~~~*/
        tooltip: {
            formatter: function () {
                console.log("Series Name:", this.series.name);
            if (this.series.name.startsWith("Deposit")) {
                return (
                    '存款: ' +
                    hFormat(this.y, 0, '.', ',') + "<br/>" +
                    "Total with Cost Burden: " +
                    hFormat(this.point.stackTotal, 0, '.', ',')
                );
            } else if (this.series.name.startsWith("Loans")) {
                return (
                    '放款: ' +
                    hFormat(this.y, 0, '.', ',') + "<br/>" +
                    "Total with Cost Burden: " +
                    hFormat(this.point.stackTotal, 0, '.', ',')
                );
            }
            }
        },


        plotOptions: {
            column: {
                stacking: "normal"
            }
        },



        legend: {
            useHTML: "true",
            y: -25,
            itemWidth: 200,
            width: 400,
            itemStyle: {
                fontWeight: 'normal'
            }
        },



        /*~~~~~~~~~~~~~~~~~~~~~~~~~~ Exporting Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        lang: {
            //change text of export menu
            contextButtonTitle: 'Export Chart',
            downloadPDF: 'Download as PDF',
            downloadCSV: 'Download chart data (CSV)',
            downloadXLS: 'Download chart data (Excel)'
        },


        exporting: {
            enabled: true,

            filename: 'Cost Burdens by Income - Harvard JCHS',

            menuItemDefinitions: {
                viewSortableTable: {
                    text: 'View full dataset',
                    onclick: function () {
                        window.open('https://docs.google.com/spreadsheets/d/' + SheetID);
                    }
                }
            },



            buttons: {
                contextButton: {
                    text: 'Export',
                    menuItems: [
                        'viewSortableTable',
                        'separator',
                        'printChart',
                        'downloadPDF',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'separator',
                        //'downloadCSV',
                        'downloadXLS'],

                    theme: {
                        fill: '#ffffff00'
                    }
                }
            },




            // change options to optimize for export
            chartOptions: {
                title: {
                    text: 'Cost Burdens by Income' //exported image has title embedded
                },
                subtitle: {
                    style: {
                        fontSize: '7px'
                    },

                    y: -18
                },

                legend: {
                    //y: -25
                }
            }
            //end chartOptions
        } //end exporting
    }); //end chart

} //end createChart()


function createSearchBox(data, chart_slug, placeholder) {
    var placeholder_text = placeholder || 'Select a metro...';
    var box = $(`#search_${chart_slug}`);
    box.attr('placeholder', placeholder_text);
    box.after(`<ul id="search_list_${chart_slug}"></ul>`);
    var list = $(`#search_list_${chart_slug}`);
    data.forEach(el => list.append('<li>' + el[0] + '</li>'));

    $('head').append(
        `<style>
    #search_wrapper_${chart_slug} {
        width: 400px;
        margin: 0 auto;
    }

    #search_${chart_slug} {
        width: 400px;
        margin: 10px auto 0 auto;
        padding: 1px;
        display: block;
        position: relative;
    }

    #search_list_${chart_slug} {
        list-style-type: none;
        max-height: 200px;
        width: 405px;
        padding: 0;
        margin: 0;
        display: none;
        overflow: scroll;
        overflow-x: hidden;
        position: absolute;
        z-index: 3;
    }

    #search_list_${chart_slug} li {
        border: 1px solid #ddd;
        margin-top: -1px;
        background-color: #f6f6f6;
        padding: 3px;
        text-decoration: none;
        color: black;
        display: block;
        cursor: pointer;
    }

    #search_list_${chart_slug} li:hover {
        background-color: #eee;
    }

    #search_${chart_slug} {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAgMAAACf9p+rAAAACVBMVEUAAAAyMjIzMzMmhMtFAAAAAnRSTlMAgJsrThgAAABcSURBVHgBYhgxYBSMglGQtQoKVqJJSMEklqBJsAHam0MjAEAggGHHZozIyKgYOgDmaytinGcsYxdBBAkBCQEJAQkBQQRBBEEUQQRBBEEEQRRBBEEEQQRBTNP0vwu7s0JpRPs+OAAAAABJRU5ErkJggg==);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
        cursor: default;
        border: 1px solid #777;
    }
    </style>`);


    box.on('focus', function () {
        box.val('');
        list.show();
    });

    box.on('keyup focus', function () {
        filter = box.val().toUpperCase();
        $('li').each(function (idx) {
            if ($(this).html().toUpperCase().indexOf(filter) > -1) {
                $(this).css('display', 'block');
            } else {
                $(this).css('display', 'none');
            }
        });
    });

    box.on('change', function () {
        createChart($('#search_test').val(), $('#search_test2').val());
        box.blur();
        list.hide();
    }); //end box.on 'change'

    box.on('blur', function () {
        list.hide();
    });

    list.on('mousedown', 'li', function (e) {
        box.val(e.target.innerHTML);
        box.change();
    });

} //end createSearchBox()
