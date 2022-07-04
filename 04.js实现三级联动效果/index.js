(function() {
    // console.log(province);
    var lastProvIndex = 0;
    var lastCityIndex = 0;
    var lastCollegeIndex = 0;
    
    function init() {
        initProv();
    }

    function initProv() {
        var selProv = document.querySelector('#sel-prov');
        selProv.onclick = function() {
            if (lastProvIndex === selProv.selectedIndex) {
                return;
            }
            lastProvIndex = selProv.selectedIndex;
            clearCityOption();
            clearCollegeOption();
            if (lastProvIndex !== 0) {
                initCity(province[selProv.selectedIndex - 1]);
            }
        }

        var provArr = [];
        var provLen = province.length;
        for (var i = 0; i < provLen; i++) {
            var prov = province[i];
            provArr.push(prov.name);
        }
        initOptions(selProv, provArr);
    }

    function initCity(prov) {
        var selCity = document.querySelector('#sel-city');
        var onSelectCity = function() {
            if (lastCityIndex === selCity.selectedIndex) {
                return;
            }
            lastCityIndex = selCity.selectedIndex;
            clearCollegeOption();
            if (lastCityIndex !== 0) {
                initCollege(prov.city[selCity.selectedIndex - 1]);
            }
        };
        selCity.onclick = onSelectCity;
        var cityArr = [];
        var cityData = prov.city;
        var cityLen = cityData.length;
        for (var j = 0; j < cityLen; j++) {
            var city = cityData[j];
            cityArr.push(city.name);
        }
        initOptions(selCity, cityArr);

        selCity.selectedIndex = 1;
        onSelectCity();
    }

    function initCollege(city) {
        var selCollege = document.querySelector('#sel-college');
        clearCollegeOption();
        var collegeLen = city.college.length;
        var collegeArr = [];
        for (var k = 0; k < collegeLen; k++) {
            collegeArr.push(city.college[k]);
        }
        initOptions(selCollege, collegeArr);

        selCollege.selectedIndex = 1;
    }

    function initOptions(select, data) {
        // console.dir(select, data);
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement('option');
            option.value = select[0].value;
            option.innerText = data[i];
            select.appendChild(option);
        }
    }

    function clearCityOption() {
        var selCity = document.querySelector('#sel-city');
        // console.log("selCity.children: " + selCity.children.length)
        for (var i = 1; i < selCity.children.length; i++) {
            selCity.children[i].remove();
            i--;
        }
        lastCityIndex = 0;
    }

    function clearCollegeOption() {
        var selCollege = document.querySelector('#sel-college');
        // console.log("selCollege.children: " + selCollege.children.length)
        for (var i = 1; i < selCollege.children.length; i++) {
            selCollege.children[i].remove();
            i--;
        }
        lastCollegeIndex = 0;
    }

    init();
})();