/**
 * Credit Card Logo
 * Credit card input for AngularJS
 * By Samir Ranjan Mohapatra
 */
'strict'
angular.module('ccLogo', [])
        .directive('ccLogo', function ($parse, $http, $sce, $timeout) {
            return {
                restrict: 'EA',
                require: '^ngModel',
                scope: {
                    card: '=ngModel', // Bind the ngModel to the object given
                    label: '@label',
                    css: '@css'
                },
                template: '<div class="cc-holder"><label class="ccholder-label">{{label}}</label><input ng-model="card" ng-change="GetCardType()" ng-class="cardcss" ng-blur="checkCardValid()" type="text" /><span class="cc-error" ng-show="ccerror">{{ccerror}}</span></div>',
                controller: ['$scope', '$http', function ($scope, $http) {

                    }],
                link: function (scope, elems, attrs, ctrl) {
                    scope.label = scope.label || "CARD NUMBER";
                    scope.ccerror = "";
                    scope.cardcss = "default-cc";
                    scope.css = scope.css || "false";
                    if (scope.css == 'false')
                        processCss();

                    elems.css({
                        'display': 'block',
                        'width': '100%'
                    });
                    function processCss() {
                        var outputColorCSS = {
                            'cc-holder': [
                                'width: 100%',
                                'display: block'
                            ],
                            '.cc-holder .ccholder-label': [
                                'width: 100%',
                                'display: block'
                            ],
                            '.cc-holder input': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQpJREFUWIXt1itLBUEYh/Hf8YbHJiIGy9HiBUWw+QEMRm1WP4PZavUz2Ix2g8EqCqKiQRFFEMwWr2FnPeuyCMKZPYZ54GWZHdj3mXfC/kkkukyjYj2L0Uj9nnGOz6rNKZyEzZh1jJly82HcYw+TaGKww9VEC7t4wlhRYAsX6PtlfJ2iRzbp7XwBSzjAWw0CHzjCAu0TD2ENizUIwAQuiwINjIeqiyvaV9A18gm84xD7NfVdDT1/CJxipyaBFqb5B1eQBJJAEigKlMNJTBpCKMkFblWEhIjM4QZ6w4s74f+M6/AciFAj2MQ6NmQR7ZsVPIofyR6wnDct33s/5mX5IAYvOMNrpO8nEn/nCxy8Vf1MxaH0AAAAAElFTkSuQmCC')",
                                "height: 35px",
                                "padding-top: .4rem",
                                "padding-bottom: .4rem",
                                "background-color: #fafafa",
                                "background-repeat: no-repeat",
                                "border: 1px solid #ccc",
                                "border-radius: .25rem;",
                                "padding-left: 45px",
                                "width: 100%",
                                "box-sizing: border-box",
                                "background-position: 10px"
                            ],
                            '.cc-holder .cc-error': [
                                "margin-top: .4rem",
                                "color: #c12222",
                                "width: 100%"
                            ],
                            '.cc-holder input.amex': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABLBJREFUSInFlFlsVFUYx393m6WztLTTZboyKlBEaANGQBIWE1D7YGwMD9pEoxiTGpUXifpiDC8+mGDiEg3yYAAVgkERS1iFFspakAqltKUb007bmc501ttZ7tzrQ6GNhvJYvuQ8nO98Of//Od/vHKF2a+sHOvrnImIOcxg6+qAIjcKyrWcTcy0+40IfEB+ZOIAozhcfmfi9kCtcFl5/rgyAYDRNgdMEwKn2IAVOhVqP86EbaJrOZFrHkSMTUzUMDJw5yvR6VM1gkkUsJomxiRTF88wAnLs1QfPNEGLD+lKu90U50hbg7U3l3PEl+P3iGO/WVfDGhjJ+bvYRVTO090c5eH6U3y6MUZirsOf0MLuOezl4YYwaj4M/Lvt56ZkirvZGOdA6ikUR2dcygstpYnV1Hj81+6gstLCsyk7XcIKnquwAiEur7Az6JyktMHOyPYg/kkYSBXp8Kifax3HmyIRiGUYn0jy/3EXDejcleWZkSeTLLdUsLLPROZTAG0iy/9wItR4n+7fV0NIR4pVni9n9l49URscsi3x31Is/ksYfTs204PCVALHJLH0jKkPjSfLtCq+tdfP9MS8C0LCulP4xFYBkWkdN6egGTMQzHLrkp2dEpe7pQgDSmkGBU8YfSXP6Roi0ZjAcSnKpO0JxnokXV7j49shdinJNMwYudoX54s1FIMD2X+4wGEhS7rKwuNxGeYEFu1VCkUXMisiZmyEUWcTlUPAUWalfXcwT7hxuD8WxmkVeXlnEJ3u62XvGxzubKli5KJcNS/PZfdrHY8VWGtaVcvTaOCZ5hn2hpSNkNF0JMBZO8dbG8ilwEhpWs0R0UqPAMQPU/6PTG2dxhX16Hklo6IZBnk0ho+l8vLubbfUe3PlT4N32JqiusAFw7No4TW0BhNqtrcaDNndYZSRR+E8uqmYwKSIWRZrOqaksVpOIIEzVquksJklAlmZOmdZ0BAGUe7lEUiPHIiEgIM92ul3vLcEbTIIxY2gsnKK63M7dwOR0XZ5NYX6xlet9UQCsJoklVXbaeiIAyJJAjcdBe38MLWvwuDuHeDLL2MQUiFLJqi2fPcjA5jUlvL+zkwWlNiKqxq/nRyl3Wdl5zMtkWudEexCX08QPx4dAgH0tIxTlmdl7xockCHzTdJfKIiuJlE7zzRB/98WQJAGzIvLRj92UuSyEVY2H/oQZTedsxwQdg3F2bKnm6z8HqfE4eWG5i2Q6iz+cJqJq2MwSEVXjxkAMXyjFk5V2EsksZzsmuN4XZVGZjR6fyqn2IOG4RmWhhZPtQa71Rmdvwf3rbFjnBmD7vl42rynh8GU/hbkKFS4LdStc1K8qQk3rLC6382G9h68OD9I1nGCeXaZhvRuTLFKSZ6axroKrd6Jc7Y3y6lo3hgE7Dg3MDuH+bTWcvx2+jwD5doUCx9S40BVmYamN1s4wB1pHafp0Bbe8ccyKiCIJWM0SV+4xYJJFqsts/DMYwyyLbKwtoKktgAF4iqyzG1jgzsFinqEdA25547jzzcyzTz1NXzBJMJZh6XwHALFJDYd19ktNJLNkswZOmwwGBCLp2Q3MTeiGqKMPPjp9sV8UoRFdH5hjZQOdPgOj8V/jq/SRgkj0xAAAAABJRU5ErkJggg==')"
                            ],
                            '.cc-holder input.dinersclub': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAuBJREFUSInFlT1sU1cUx3/v+tnv2Y7z6ogQO19qmrZYUBG1UlWFtqICVVGF1KUSW7uUoV0QE0PVhalrmRkYGCohplaoqrogNaAiBkgCqGkSU+y4oTbxx/Pzs9+H7+2UMICRgwL5j0f36PzO+d97rtZsNk8rpX4QQiR4hZJSPhRCfKvZtt161cW3pJT6R3McR+1F8S3pO02QSrFQdNlohHiBxA8lZlSQy5ocyMR3DLCjCTxqBFxbafH5e/sZTkUBWCo6nP+tSL7S5vB4grOfjWLFI30DiH4P+qHkj1WXr4+OUap2ANio+4xYMc5/+TZjaYPFdZdzP68jVf+u9g3wZ77FyQ9GuP2wyfdX8gCsVzucvvQ3utD46qMsACv/dbiZb+0+QM3tkjAi/H63iuJJh2XbZ6HoMDM5sB27/6+7+wCgAZA0nvZ3wIjQlU+ghNB2H2BkMEK1FfDF+/tJJ6Pb8dm3LA6OJbmVt7dj704m+wbo+xUoBT/dqnHqk3FaXpcBM4Lrd4lHIzx2Ar65+Be1VsDsdIrvTozuPgCA0+nyy5LN7JtpcqMJvEByfaXBhWslqk7I3DsWpz4eJqb37+wLbcJSzWet4uGHEk2DeCxCLmMylNzxXusN0HZd5ufn0XWdA7kc2WwWTet9uZaXlzEMg0cbG0xNTTGSyXDj+g2OfHjkuQA9keOJBGHY5fDMDFcuX+bTuTnqtRqDloXTdNBQCF1nKD1EajBFab3EsePHaNTr3L93j5brUqmUWbhzhzemp0mlUs+s09MspRTdbkihUMB6LU1tc5NBy+LXq1eJxWI0mk2SiSSLiwuYpkm9XgPA8zzK5TKVcpkgCJiYnOTu0lLPCTzXgtXVNfYN78M0TNqdNrqu4zgO1c0qmWwGXdcJg4DxiQmKhQK+7xMzDGLRKJ2Oh9dp4wcBBw8dQohn97qn37GUUglgba8AhBArmm3bR4EfhRCvs7VvX76klPIBcOZ/YDdDkx03a78AAAAASUVORK5CYII=')"
                            ],
                            '.cc-holder input.discover': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA4NJREFUSInFlk9IY1cUh7+XZBKjY6KVqrE0TqKk4CZWS5Wi1UaqqUsFrYIUuytKt4VuuhFK1I1auii66MrGjRtrRYbBILWOMv6JZaIgaeMk7TiJmpgXo3lJXjc1QztiM9SZ+a0u95xzfx/ncOAK0Wj0c1mWv1YoFLm8RKXTaZ9CofhMOD09jb1s80vJsvy7IIqi/CrML6V4leYAqstDLBbD7XajUqmwWq0ABAIBiouLWVpaoqqqCpPJhMfjwev10tzcTF5eHtITD6noIZry99jb92IymdBoNDx8+BCFQsHJyQk5OTmUlZXh9XopKirCYrFkADIjcLvdDA0N0dTUxMLCAuPj40xMTCCKIi0tLeh0OiRJYm5ujra2NrRaLU1lp4R/+hIA9Rtv4wy/z5vld6itrcXhcBAMBrHb7ej1eiKRCHt7ewSDQXp7e7HZbMC/RlBdXc3AwACNjY1sbm4CUFdXh9PpJDc3l5mZGYaHh+ns7KS9vZ2zbWemNhHY5GP7u8zOzjI9PU1/fz8A6+vr+Hw+gAyAwWDI1P0DIJ1Oc3h4yNraGmazGQC73c7U1BQOhwOLxYLL5eLi4oLd3V1uvf7W01beyuU1YxVqtZqtrS1qamoAGBsbY3BwEIC+vj6USiWVlZXPjsDv9zMyMoJWq6W7u5uKigoWFxcRRZGVlRV6enqor69ndHSUQCBAV1cXHzTUEf35G1LRx+S98wnqsmo2NjYIhUK0trYyOTnJzs4OarWajo4O8vPz8fv9GAwGrFYr5/v3yHoNj46O0Gg0+P1+UqkUyWQSo9GISqUiFAqh0+kIBAKYzWYkSaKwsPDa95LHvxH8vuPpFvyXlpeXicfjaDQaGhoa8Hg8rK6uUlBQQGlpKYIg4HK5KCkpwWazXQuQDD8i9EMf6fNI9h0IBoMcHx8Ti8UwGo0olUrC4TAA0WgUnU5HPB5Hr9cjSRLl5eVXviM98XDk/JSUeAiQPcBNKO75kfD8F6QTZ5m7rEfwfyQnRCJ3h4htzzwTe+EA8d15IneHSEUfXxl/YQCJR+tEloZJ+B9cm3ezALLMuXcJcfU7Lg7uZ1VyIwCp0z85+3WW2PYMqfBB9oWCgOrvn8nVO3OdafiA+P494p55EoEHID//Milvl0iCKIofybL8rSAId65LTp4ckPhjk8TBfc59v5A68T23YUaCgPJ2iaS1fPjVXxSsjAvb/gI6AAAAAElFTkSuQmCC')"
                            ],
                            '.cc-holder input.jcb': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAspJREFUSInFlVlsjFEYhp9zprN1ZmhRnbF1QcVSEvu+RCQklovi0hUVa1xwxZ2IWxcSEkSEuBBBpCQIEVva0ERLCVNLW0ZNp9vM33a0nXNcWDrN/H+VUO/Nn7zfOd/75Dt/zhGxWGy31vqwlDKdAZRSqkZKuU1Eo9G2gQ7/Ia31e2EYhrZaEPzQTOWbBpTq8VbOycWX7iD+NkhH8BWanu2ZS1aA08nTT88IGw0/fbfDzeLc+aYZaVbhl+8FOXimNMWfNdFP193r1J88mlLzzpzD0ScXeFhT1svP8gyzBJBWAMeuVJgXtCZ8/rRp6VO0PiX8V7IEaI7FLQAUqr3NtGR0mvt/BDBQsvwHkjVuVAbjR2USihgASI8H7/TZOIb7AeiKRGirKMfl8vU66y7VzfPPL/vs3a8JLJ+Rw6EtC9mwtACEoOD4eUYU70F9+ULnxzoc2X7SJ0wk4M1mx7xibNLGiEEB9i7axYFl+/rs3a8J9JKQSI+H8LlTNJVc+uaVPgAge/NOAOw2Ow6bnYRK8Ky+qs92/ZqAFN++CZV0ZWhlvhhNNB6jrjWEBqYGJuNMc1r2tpzA/k1zeVD5AY1g1dw8tIZHz0MU5g9FxTsYum4jCSNGZ/gzrpx8OkN133cK3HYXbrsTAeRkjMbjsL5oLQFKq0LkBTLwuNO4cr+ashf1VL2LsHXNFKq3b8I3az72LD9pWdl0N0aIv39LuK2Bkjcl2G12ulWCE4/P8DpSTXtXx+8D3C6v7T3yJHW3NNN861qK39LRys3gnRQ/yzPMEuC/3wO/DTAo3WHqCynB5TKt+ZzevwOwfmkBmT7zkCGri0wBhBAUTVlr2dPyOT574wXJhfzAYBYUjkSgaLx6MTkB55g8vNNmEGlv4mFtz2NkEzYK/ZPIyRhtGq6U0sIwjGpgrCXiv9VrEY1GlwBHpJS5gBigYKWUegfs+QrYOfq3OZB7kgAAAABJRU5ErkJggg==')"
                            ],
                            '.cc-holder input.maestro': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABJlJREFUSIm9lVtsVFUUhr+zZ+bMtZ3STstMr9OWIi0XBQoqoiTFxpAmCl7gSSIYY4TEGI1ivMToAyb6ojHGy4tBTYhRDA8mBjUUREmsUG690Q6UaTstbae36elczszs40OhUqeVeWI9nbP3Wuv/9loreyvT09MvGobxvhDCwR00KWVQCPGCEolEZv5PfHAySXAsTkw3cNkE1YU2ClzmBX2TY2HivQHS2jQmux1rmR+1uHRRCMMwrimaphkZdIbBL+1THD03QWhCzwhc4bOzsz6fDZUuALTWFka//5bY5Y4MX9VXQv6jT7KksQlFiIz9DICpWJqDP4XoGIotSn7TGpY7eaL7MNqJY7f1ta9YSdmBdzG78+atz0OK6pI3f+zPShxg8lQz57uug5J5sv9arKud4NuvIKMziwN8fmKY4FgiK/Ga8U5ceoQel59pty+rmMRAkKEvPl4YoDecoLkrklUigJxkBKmYkIqJ3wvvRdjsWcVNnTpO/Gpg7n9unH/rmJpbzLWbKcq1MDih47AK8hxm+scSJFISgOXjnawavQCAwuwIJRQzFkXBUbWMWO8VDCkXhZhsPoa3atl8gPbQv31vzO1k/95dHPj2IrvXmVlZV8u+L1tY7VMZjtu40OFjYuvjLHHncPrSCP4iC8WFBlO/fseOT77izP492Mr9WGWaqaFBbGs3Ygl0MnPubwCiHRfntOZaENaSsx+GwfJyDz2Bq6zN17BYLAwMjZAaaIWJXl5tqqCxRueh9SX4cuNsqi/itecf4VIohF7oIxQM0m51seLlNwiUVLL6w09pGQ7jf+sgttJyAJKjI5kANy0dHaeutpbWS91sb1jH2bYAPX0jvL63CadVYLOq1BSpSCnRonHaekc59M1hntm9E2tZBeGW06iFXgJ/nGR86DrD3ZcpPfkzcV3H5Mq5oSoyAZa6VQDU6CAmi5WB4XHae/qQyThX+oYoyM/DX1HO1f7rNP/ZitfrpbiimuqSfKrr7iERj6E4nFRuacC9rAa9q53h82fxVFax+rOvGejsID01OatR5J0DmLuIDp0O88OZMeTMGMLQSaeSmB15pMb7MHuqMMI9GGouwurEDnivHcdmtZNOpzCZDB5Oh0j2daE4HERnotSoZoQhaUsr2JxOqvUZTChgSDw7dlH09HPzh7Cxzs2Rs2MIZwEAJsAATN5Vs3PuvRvlxpouU/hdeYCBsFhwpTRKhrrBIiAZB1UAEhRYYzYgod1QMUAR5G3dltmC4jwLTWvmX5OLWUqYaStciyc2SkFslDo9lFUcgH3rNiKqLRMAYM8DhdT6srtQRhxLafFtxm614B4O3D4AcNxVR8Wz+/B4PAsDqGbBe9vL2FTtum0yBVjfUM+DG6uyegty79tMxTsfIKzW+XkWeo4BWno1jrZO0DYYxbjFw2JSqPc7eaq+gJqls6WMXekmfOQwM61/IfVbnm9F4KhdScFjO8nZcH+GhpTSUDRNCwDVi5FHdUn/eIKYLsmxmSjLV1HNC59Y6jr6QJD0dARhd2AtLUc4nItWBehWIpHIFuAjIYSf2creCZNSyl7gpX8AfX7PwROK2zYAAAAASUVORK5CYII=')"
                            ],
                            '.cc-holder input.mastercard': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABIJJREFUWIXtlUtslFUcxX//+33zaKedQltaHk4f0rS0aAOOWGRBIaKCFFCJgYSQYKImJj43JrKQGEyMcaErY1ipISISH4BgTIxiYtEKigotaUtpp9OWAtN2mD6m87rXBQJ9twthY09yF/fec8859/H9P5jFLP7vkICdc79SpsggyTtqjFFamyt0OLOfupPGIxF0Zj9payQxGaHLUeDXyE6QKjR5QBQxDUbUkWjCOlTKhRiA2YOK+X0bFbIVY5aByQTVhzJnROSgo6b9+4n0RYhIuzPn8YJ4z9cjJzopzTV2fB/CE5OFM5o2QZ6ddyRxWTQfg1o+GVcbfRIxu9ybOptHjne4stepseQO92KfseJ1U5kDiKJIec07OqVOTmUOoEStQktd/JsC/7i5kZ3T+B06kTqM4u6pBK8n0HGTxrLwyyoj2TYtG6XUXKP1UXNkQe7IcXtkJ98OvSAiU+7mBpzVpsWzXpcDmLiAMSDTZBa1IIbaCzx/M9gohpGXZmKOECZlLYkeV1xvgg7NaCVovUsfL/GOC9DhLCoLudOKoj8dZqjmUa4d/4zBF59BMj2I03GdPMdLaGkFsW014piP2MVerDyDNV/R3+bmtPd9+lbUMuRdDY4sEHWrKSdnBx+ge+EedzwZq77hO+IKpLSxqITHKks5V7OeiqpK/vi9AddXn7KkMJdztX/jLSsmUPsXyx+pymq+sA1v8SKGPtxPyd5XOPzdaSo8Hn4+8DSSv4HCe3azwNHGcFoFpvcU7oWrmZfU9Ae+RSFlwNFRJ2DANXBvBY31bZRsrKaxsR1vJEx6dBAry0vAcpN3uRudO5fm9z6ifI2fWDTGtRX3EWjpIhqJsDB6lJrFTfjyPJhklN5ELukeLyea0wmf/YBfztSTET8PGNe4K1A6dUkqSrl6tonu5nYyM9KJPLyW/qY2wt09lP96kmTlUhaUFODOyaIvFKbv4DFCrV3EfvuTSOAiVtEOGtJfxVe5lZ6eywz0h7kWakUnh8nwPcTqKj95VjMG03Xz3G8UonbuSvtyzfr+kkjIctg2oeJiQp1XsH2LyBqOEvb5yG+5wEVx4h+6qs9lZ6j0JeVkNtdTHglilwc5UbSd0twwDZecZLo1+e4e8jyDDPQGCDo2IKkBti/+AR3vLHNv7GrqcGWvG1UJO+zCTxDZOe1DBpOxM3XVnqPyAMQNrgfNzD4CQ517c/tKmKASpiz9JhCdTkSBDB0QVyoEqRCIPd2Kf801xlLy+hitWyiMBVsM8pyG6beTVFmxOlqtbINzxcx2L2LectQEfpw0AIAv0brfwuzQMDidYLyFU46V5l2tpw6sIQVmt2tz8I2xc+MCACxKBA7YFkvRZp9BR8aIGQ21CFsKkoFtaduDrylklTH6mDZ61K9dax3DcEhQfuem4NsTeUnQmb3VF+/9YrL0hmo76GgvV5p8kVQ0ldTnC+jonZD7+byMRJqrQkR5DfQ5PFIvawPDk2kHnDlbJOjKWYMxOYKKTUa8HTBopxEzJLcGmOFb/s+Qkpk89lnM4nbjH9R2z4sGtG3lAAAAAElFTkSuQmCC')"
                            ],
                            '.cc-holder input.unionpay': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAADskT9PAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAzJJREFUSInFlk1s22QYx3+v49iNadambom6ZNM0tDKtrbZ11bYKxIdA5UMgDpOGCkdAOyGBNGkSaBIXLly4QjlNDCQQ2gEOnDixQqBrkk4wtdtgS5MhkaS0cdvEcWK/HNAqQmxLO6w8F+v5+/Hz//v5eG1hWdbjEs4gpcLOmhRCfKRKeAOYQYgd5gcPmjv91l2mht2UjoP3wYfIHzLgugA4PT289+LbfFc38CQIAQJQFRgZ87jeXMeVsivXRKKf2RMT9yjgy0t4n3/RgX328lt8XFQAuwM/Ma7ydeVOYK5SvcGsDx7aAvnzlS7scv9+39hIbyssFZNmwhcPF5DLEz0+CUL8cwUydsw3dlU2eDQ5xOSgid84nxwcuDcBsrCCAPTTp4js3YP23DMUxyZYczyePWiiKoJePYIWUUgloiQfiDGzfx/vHh7lQN8uAPSIgqYoqIpgatD05QmcAZnNox49THvxKurEEbxqFXH2LOfaA8TUCE+PDJCMaxTXm4yme8jWyyR0jV/Xa5wbP8RuI8Z8dZVhI8Y7VxY5HtCCYAELObyahT5zGlmzaM39yLelJkW9Sd1xefLAAPk7m7RcD6PuEI9Gee37DDE1wvvHjlDY3KJsN/EkJHt04qo/VWgF2rcLbMwvbGMXEs+zVPsDgK+uljn4oIFluzwSF/ze2KBf10gbBhd/u8XN2gbnj45zPrvIqT2pIBp/AfKvNeTtQge2biZZttxt/8xUiumHTeJ6hGutKi/oKa7XLKZTw1RsG1dKPr15i7Wmw0nTfwAhYAhlLt+FzR97gn+fL2PDvRTWbHQNRhN9fLNS4lCiD0UI5soV+jWNTKUKwFTABgQKYKFbwE/p8Q7f9STZkkWpsUXFtpkrV9hstXE8j4ficUpbdf5s2Ow2YqQN/9WFgBZ42VwXlokOAd62/+alZQB+UYssbKwC8PrlTNdzYeUHvwq028hrSx2Qq0bJ1brPd4AVZzOU4LEh//2/a90VUFWU6aeQS8vcbboqBC+lVfJbKpJOISO7TG7YFv+VJ4CpQZNX9u0NFSBqlnUReDU06j6ZhAv///+AgFkXpILvN+S+mQcyAp/8DcTdJ8S+tu3LAAAAAElFTkSuQmCC')"
                            ],
                            '.cc-holder input.visa': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAyNJREFUWIXtll9oU1ccxz/33nMbm6Y3SbvZNmlSddGxDiqbClIF938oAx8cjoGw4avFB1/cim7Q/WMd+uL+CAob68tgMAaTsbGBQ/wzuwXtCilm/aNpa5PW3liNNWvuvWcPXV0yunRULnvJ5+l8zz3nfL/3dw6HAxUqVPifUYrFmz3fGtZE6p2CXah3w0zX9OmmVXWvd+zenVvoE8UD0v19v8T7B9a5Yb7AprbWp4BHF7RaEmDajLhpDpA2sy3FuqQC0aaGvNdTVe1mgAfrg/liXXIGpm7OXFZgvZsBgPgDAf/GBSEWHWKZKIUxAKTeDKIOgMwNE4+uo6gKlmVRHwwgpWTo6hi3c7OsjoYI+GtxHIcp8yY13mp83vIFXTyACEJ+ADn+NkKTWLHvGBwZpaOzm70v7yTel2DOsnivs4POdz8ikRwGYM+uHex5cTuffnGKL7/5gSe3buTgvlfKBlAX71aQvi2c6N2LebceReY5ffZXdCF4/onNjE5MEmlq4HxvH4nkMO8f3s/Xnx3hhWe3UJgr8P1P5/FWr+DK4LWy5mUCzPPw2hgdnzRyyxzh9IU47Zva0HWBmZ0hEl5JS6QJXQi6P/ycc72XCfgNzly8RC43y0s7n2Mic4Pc7N3lB2h7JMZkdo5jPecwszPseGYro+MZAKLhRh5a1czRrgPUBQ0++LiHRHKYUz+eJbYmwppoCCklvw+llh8g4K8lGm7kzMU+mkMNrG9dS+p6GoBIqJGf4/0EjFq2bX4MgN8SgwwkR0gOpTjcfRyAK0Plt2HxQ1hchdYYqfE0259uB2DsegZdCAzDR9eBEzhSoigK29o3kJ6cxuet5uTRQyiqymtvHSO5RAWWvAccx8G2bIQuUBQF27ZxHImuC+7M5pkyTYKGgd/wUbAsAHQx/1+WZSOR9/Rf/Id7oAhVVVGr/t4pTdPQtPl2jXcFNd7QvW//MEIIbanlSwPo115toTCx5KT7wRGh1f8agLmrHuWPYVcDqFW2p0QXC0drHnXVHZCeyEixLqlAMPz4hmwm3KWqtisPEkcRU8HAyjfgKzeWr1ChwvL4ExXmDCHTgA+oAAAAAElFTkSuQmCC')"
                            ],
                            '.cc-holder input.default-cc': [
                                "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQpJREFUWIXt1itLBUEYh/Hf8YbHJiIGy9HiBUWw+QEMRm1WP4PZavUz2Ix2g8EqCqKiQRFFEMwWr2FnPeuyCMKZPYZ54GWZHdj3mXfC/kkkukyjYj2L0Uj9nnGOz6rNKZyEzZh1jJly82HcYw+TaGKww9VEC7t4wlhRYAsX6PtlfJ2iRzbp7XwBSzjAWw0CHzjCAu0TD2ENizUIwAQuiwINjIeqiyvaV9A18gm84xD7NfVdDT1/CJxipyaBFqb5B1eQBJJAEigKlMNJTBpCKMkFblWEhIjM4QZ6w4s74f+M6/AciFAj2MQ6NmQR7ZsVPIofyR6wnDct33s/5mX5IAYvOMNrpO8nEn/nCxy8Vf1MxaH0AAAAAElFTkSuQmCC')"
                            ]
                        };
                        var outputColorStyleSheet = '';
                        angular.forEach(outputColorCSS, function (value, key) {
                            outputColorStyleSheet += key + "{" + value.join(';') + "}";
                        });
                        angular.element(document).find('head').prepend('<style type="text/css">' + outputColorStyleSheet + '</style>');
                    }
                    scope.GetCardType = function ()
                    {
                        var number = scope.card;
                        var creditcard = new Card(number);
                        scope.cardcss = creditcard.getType();
                        scope.ccerror = "";
                    }
                    scope.checkCardValid = function () {
                        var number = scope.card;
                        var creditcard = new Card(number);
                        if (creditcard.isValid())
                            scope.ccerror = "";
                        else {
                            scope.ccerror = "Invalid Card";
                            scope.cardcss = "default-cc"
                        }
                    }
                    function Card(cardNumber) {
                        if (typeof cardNumber == "undefined")
                            cardNumber = "";
                        cardNumber = cardNumber.split("-").join("");
                        cardNumber = cardNumber.replace(/\s/g, "");
                        this.num = cardNumber + '';
                        this.type = 'default-cc';
                        this.useLuhn = true;
                    }

                    Card.prototype = {
                        _cards: {
                            'amex': {
                                prefix: /^3[47]/,
                                size: [15]
                            },
                            'dinersclub': {
                                prefix: /^(3[6-9]|30([0-5]|9))/,
                                size: [14, 16]
                            },
                            'discover': {
                                prefix: /^(6(5|011|4[4-9]|22))/,
                                size: [16]
                            },
                            'jcb': {
                                prefix: /^35(2[89]|[3-8][0-9])/,
                                size: [15, 16]
                            },
                            'maestro': {
                                prefix: /^(50(18|2|3)|5[68]|6(304|7))/,
                                size: [12, 19]
                            },
                            'mastercard': {
                                prefix: /^5[1-5]/,
                                size: [16]
                            },
                            'unionpay': {
                                prefix: /^62/,
                                size: [16, 19],
                                luhn: false
                            },
                            'visa': {
                                prefix: /^4/,
                                size: [13, 16]
                            },
                            'default-cc': {
                                prefix: /^\d{1,4}/g,
                                size: [13, 19]
                            }
                        },
                        _luhnlookup: [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
                        getType: function () {
                            for (var c in this._cards) {
                                if (this.num.match(this._cards[c].prefix)) {
                                    if ('luhn' in this._cards[c]) {
                                        this.useLuhn = this._cards[c].luhn;
                                    }
                                    this.type = c;
                                    break;
                                }
                            }
                            return this.type;
                        },
                        isValid: function () {
                            var len = this._cards[this.getType()].size;

                            if (this.num.length >= len[0] &&
                                    this.num.length <= len[len.length - 1]) {
                                return this.useLuhn ? this._luhnCheck() : true;
                            }

                            return false;
                        },
                        _luhnCheck: function () {
                            var sum = 0,
                                    i = this.num.length,
                                    odd = true;

                            while (i--) {
                                sum += (
                                        (odd = !odd) ?
                                        this._luhnlookup[this.num.charAt(i)] :
                                        this.num.charAt(i) | 0
                                        );
                            }

                            return sum % 10 == 0;
                        }
                    }
                }
            };
        });

