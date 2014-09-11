define([
  "phaser.min"
], function(Phaser) {
  "use strict";
  
  /**
    * The loading screen
    */
  var _LOAD = {
    "loadBar": {},

    "loadText": {},

    "preload": function() {
      this.loadText = game.add.text(game.world.centerX, game.world.centerY - 30, "Loading...", {
        "font": "400 15px/1.5 Arcade-Normal, Arial, sans-serif",
        "fill": "#fff"
      });
      this.loadText.anchor.setTo(0.5, 0.5);
      this.loadBar = game.add.sprite(game.world.centerX - 100, game.world.centerY - 10, "progress");
      game.load.setPreloadSprite(this.loadBar);

      game.load.image("tutorialDesktop", "data:image/png;base64,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");
      game.load.image("tutorialMobile", "data:image/png;base64,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");
      game.load.image("background", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaEAAAJYCAMAAAD8A6m8AAAAYFBMVEXSjjCQUSXGfCuaLxa6aCaXKxlhVlG0XSOSIhaOGhGrTh+PHBGcPjWjQBrLgy1XIAuLFg//7M/bw6LUkjGoeEnLjEuHgnxSGgZmIgmrlHCTj4nXkkqoo5y+tqsmEQ/kzKmPN/95AAAHF0lEQVR4Ae3d/07jRhSAUePY9Y+sXSC73TbdNO//lh2krUEpa5I4ODfx+f6yZAmQjuYOQZoh212k7be/p6dv293/IkRIhO4iQoQe5ozQ6ULb7zNGiND5EYo+5QhdS4cQIUKE7EGE7k2HECFChALsQYSsH0KECBG6wB5E6M/PbOAhRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiRIgQIUKECBEiROjeI0Tor7c9PR0+DE/jL+cRIvSUen0YnsZfEiJEyJQjdNuZcl9vvrsX2t58saccoRmEHt+WvVavj6smNKvQZqh5PK5mstAfN931hNZHCq2nC1lDhAgRIkSI0EcR8rtceCFriBAhQnMKPQYXItR2ZWghQskonhChTXAhQn3fZ5GFCKVyQoQIEVqIUNF2NaHrC9WpA6Ghvry+EKGXfiWUnyxEiBChPozQbzfR/EJVUfRBhP65hWYVGpAGoTqkEKHiP6GsarvIQoRSVXAhQu1NCxEiRIjQ0MWECBEitOq6149EVVVHEyKU6javlQGFCLWvQBmhX0eIECFChAgRKqoushChVHV1IUKHSs16vYosRCi1GCFChAgRKroyshChVEuIECFC9yZU5nkeVIjQUBZbiFATR4jQ0IHQwXm8oEKEUn0ZW4hQfroQIUKENsGFCBV5H1iI0MF5vIBChA7O40UWIpSqCBEiNEmojSBE6KXFCBEiRIhQ17YDUl6162hChA7O49UBhQi1r0AZIUKECBEiRIhQ6n2hTdXWhEILbXpC8YTWZdkNQjmheEKpklBwoRUhQoQuJtQQCi2UFUVHKLJQqj1ViBAhQmXf94QCCI0qZYRiCzU3I0SoaEtCkYVS3dxChAgRIkSI0IZQcKGi6AlFFkpVb+6/aAgFFCo2Q/maUAChL6lfCTWEAgi9RIgQIULLFHokFFuor7qGUCihw/9guMnXhGIJHZ6YLBpCEYXauxEiRIgQoaH3hdaEYgv1VbUiFFko1RGKJ1R3XUYoslCKUHChhhAhQoSWIpR3hGILbVpChAgd2VuhLCMUWCgRNU1OKLJQ6laECBXtilBkoVRLiNDsESJEiFBPKLhQkfeEggnVqbdGHaFgQofrqB2EGkKxhZqaUGShVEboIEKECBEiRIjQqm0rQpGFUjWh4EIrQtGEyrIkFFooRYgQIULHRYgQIUJNWRCKLJQiRGjeCBEiROhLilBQoSFChAhdSmhdd4QiC6VWhAgRIkSIEKELRogQIUIpQoQIEVqKUJYRiio0RIjQxAgRIkSIECFChAgdRogQIULnRIgQIUKECBEiRIgQIUJ1TSi0UIoQoXMiRIgQIUKECBEiRIgQIUKEyrIkFFooRYhQzAgRIkSIECFC346IEKHpESJEiNA4xnQhQoQIfX2v+YQIjTBcWYjQxwtlrO8jPbxEKKbQEKGLCI13z0KEJk85QpOJfv9gCU0XIvT1zD5diBAhU+6B0GShcZ+pRgnoboUIESJE6OGB0GShp4s0YQURIkSIEKHAESJEiBAhQoT2oxEiRGhahAiFjxCh/ZTuXYgQIVOOECFChPbjESJEyJQjRIjQwoX2x0SIECFTjhAhQteKECFChAgRIrQ/I0KEPjdTjhAhQqYcIUKmHCFCphwhQqYcIULLPPtAiBAhU44QIVOOECFTjhAhQoQIESJEiBChhQl9v0iECEWIECFChAgRIkSIECFChAgRIkSIEKHtxSN0sstY4YUI7S4eoRPbjUaIECFChAgRGonQ9hMjNNL2yMILEdp9YoRG2h0ZIUKECBEiRGgkQttZIvSz7cmFFyK0myVCP9udHCFChAgRIkRoJELbeVuo0Pb8wgsR2s3ZgoV250bo2AgRIkSIECFChAgtNEIXi9CPZUaIECFCdxQhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESK00AhFz5Qz5QgRihshQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBAhQoQIESJEiBChbewUXojQj9iJECERIiRCIkRIhAiJkAgREiERIiRChERIhAiJkAgREiFCIqQPhbaxU7aPnSIIiRAhESIkQiJESIREiJAIERKh57chOE3o+TBChOJFSBOENF/PoxEiFDVCsg8REiERIiRCIkRIhAiJkAgRev6gy33tCX3uNyFEKGgiREiECImQCBESIUIiJEKEREiECOn5nQgREiERIiRChERIhAiJkAgREiFCIiRChERIhAiJECER0sdCkS97eL5KwX748EKE9rETIUIiREiERIiQCBESIREiNKUr/OWVECFCsg8REiFCIiRChESIkAiJECEREiFCIkRIhESIkAiJECERcuPFTJcJxLhbYbZrE+5NiNA+TiJESIQIiZAIERIhESIkQoRESIQIiZD+BQ1iqU/VicHDAAAAAElFTkSuQmCC");
      game.load.image("character", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAACBCAMAAAChKoe5AAAAM1BMVEX////Xq5oMAgKLFg8mEQ++tqvScm/Xkkr/6uJSGgbVp5b85NuZdmkDNxtRQS4/MBvouKa+RSB9AAAAAXRSTlMAQObYZgAAActJREFUeF7k0usKwyAMhuH+Sjz0sPu/2kkY/RxBF0PH3PZCWwvtQ0AXQ7G0+AIhef+8Uok+Jfb7OiUamklxEsxcLnk8+ozCEsRhhZFbgdDIrCjRrMAAYFRAaCU2sgzCWAwpALQCf0QRsRJyya7U8TQKBC6CU2GtGPdIH1O/omYaVZAahIhy5pdQvF5hVCvqKPcHyWe3khiUL1Ikk8LSW5Q6Zn6tBOk4U28+JaVakWzKfrSUY+8oUqXIx9u2hVJRzpfdrRCRT5G0cgaioyAoqKEgKCiVfkhJ67qGUG7pkwoRjSkglNIIRFchukgBYFcAPU+SHjn2SIw5FOTfo9bZr9cRTaugYGhBMysodwMws6JrE3+s3NutoxWGQSCIomlmBf//ixuQMCGr3cQxDaW5L4LCQVgEAbzqAbBtdWA9bSg4qZS8ESvG0Mz2OYKIprCIYM44pTAa4xXv2edo9CjsiGJfUsq7URQA00gF0JVSnwIMUOCUoFDpdqArRCQFB5WUEhdBWbv1LnFUSjcrJJaQc+5Q9v8zKsGkI2UpmLSgKHfx/YcyVatNiInKo5xNM9g1ivWlGWy0Yko0tC5XHsU3b/MbYboy12sf/ZDyKG9mwJhVhLjUAQAAAABJRU5ErkJggg==");
      game.load.image("dodge", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEX///9pSBmMeEsnJSVXV1dUVFR4Uhy+vr6ZhFVBQUFNTU2wsLDLy8sFBQOUflFgQRViYmKHc0heXV2jjVtbWllJSUlQUE+9vb0hISEAAACSfFCRflNMTlSTfE2CcEf9/f0RIRXJAAAAAXRSTlMAQObYZgAAAb5JREFUeF7tl0mSwyAMRZsZz/OY6f63bGQcy51FQJWqXuWv/YyeJaD8Q00yH0nI8HIKGRbIzlT2IQofgKm+otJaN7y8FwATfQvmYNt1JcBkX1h5tR0HmOzLNGN8tU0Qxn56X6frwJUzplkQxn56X72VbFfwjoXF0xdWBlgDHBqSwkc80NeX7WDxbjxnV+a95A2rWCX2/gII3v6FkDdw2XV2e3jv715y5VUCMO+Oh5cKYQa+QbixR5no6zWSEHwA2uX5odA3AGNrsL9B3/NQ3Ky9ARzd3z/jeLlwxsC3RN/YjaBa1fPbyZeyBa/yqi5nXwo8qGEEbwKMZctatnwFbxzLqA82ykFmxmT9CN44IFGtkrWqTZ5Pcti8SxzNKN9ETXluaiXby74pHDxH+qo2m0wGK0PZ+8pzpO+UtaqWfmNojQdfpK+rfFhejtx4X1iZcNijrwFfOW7HEKsYXjPRvngAQoi+ePRConwN+i7nCyC+v+CL1w2E7Iuh+2Jo/X11pPtiPvL9+n59Ddl3dvDYpr2h+yJM9UW4V7Lv0Ze4slRpir4kWNatC/qS4FSOLuhLgB0NQV8KfER89JP1r793v1gaTgjXi0v+AAAAAElFTkSuQmCC");
      game.load.image("collect", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAvBAMAAAAGOGeZAAAAIVBMVEX////xkcvyms/1r9nyk8vwiceFNmXn5+dWFDz////ylcxZMYoeAAAAAXRSTlMAQObYZgAAAI9JREFUeF6VzTEKwzAMhWGtvkrnXqSDc4RCTmByA3fzUtvvtpWFqSIiDPm3Dx48gu2+v/H1iM+47ej5I5bY2Rhd/ebUTONNWLMYleG5G/Ob7wD8DUxzTNdEqAwlydPSSjGw9LgUFpqFi0dqUi5MpxyXW24JZeGWzg4YBtSJO9TNOGAaOpd8QyhGMT58a1f/AGcODFKIwS3DAAAAAElFTkSuQmCC");
      game.load.image("hiccup", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAuCAMAAABHyVrtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAP///yYRD7KurdTS0npzc+bl5V5UU40lYh4AAAABdFJOUwBA5thmAAAAoklEQVRIx+2W2w6DIAxAe6X//8e2CIvJXBTYhiaeB6DAAQIYBKhgA/DORB2buYqOnczXcYhHf5FESpZyulKbavGjrkTRg4k4pytSmpwG3efzWPOUSckiVD6tbwqJyWI92qeX+qOt826mqjZNH1z8ro7iR7AJz+jCHAfHHFeIzSJk+eG1eb73/+m3fibu/kBf4deoZZBjHbr4ig69jOswQKO+ALqgCxVVtM1sAAAAAElFTkSuQmCC");
      game.load.image("hiccupAlt", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAuBAMAAACCObfsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAP///yYRD7Csq9TS0nVububl5VFFRIFwPzAAAAABdFJOUwBA5thmAAAApklEQVQ4y83U0QqCMBTG8fkGfsx231l7gCnR9Wgv0Ei8lnqD3h86BUHpZsUU/F8d+IkT5SgEVyBWKV5lOlLN4gXSlfmO6dbiVwfle+U58OTdwMMOkqwkzmFDtI268rX2UN35aGzMgVoDF2NlO+E8j54vmLbL8m/3f/OKTs957FUTTNOrw22v3X/vZ+3fP70iC+/H4vs9w/8pfsmHD8r1x3lZzkf85Hd9Yl3X/rh4LgAAAABJRU5ErkJggg==");
      game.load.spritesheet("bonus", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABLCAMAAADkpzHbAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURQAAAFYUPIU2ZYVOLv/////YAP////////////////CJx7JzRfq7Vve9Uf39/fi9UfPBS+b/SSEAAAAKdFJOUwD///8B//8EFwK9KwdLAAABRUlEQVRYw+3W2RKDIAwF0CDVLtjl/7+2FFEQQxKXTqljZuoDnl4QcIGmaQCgOw51cUf0VLYdbT1vFXRaEIQ3cafw9sKCshe8yWT/NEiCFnRWYBD9h1lbpLSgYib7+o1V21PVZMnNzoNaW8/7vW1f9tca8zmrbcVBrHHoFpdDWis1DuIMgrwhg6YmQlVXDqlMUN4MqCeGCKJMj6qoL6PxINJ8kKlCOaTUJIg1CQqDzgfhJkX9clBBqHHI1mQ5kg3JGr//DbauyX3EmATZ1WCDcOPRMAfKDxoJok2YTBVqSkQGwnKSQaxJETZokQH/bKH6Ehn/BGSDWNMjrfODFpnBRbsj++ZiTJgETSGJAfTVsMCMFKwx3whaZyK21sBWptwgktVzJrKQoFqw/+v599Hvg/LfhvNMaUHcl6/UHEGCoKP+tB6rzBs7Tit19+mcsgAAAABJRU5ErkJggg==", 36, 75, 2);
      game.load.image("catchPhrase", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABcCAMAAACbbCG6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAP///yYRD3dwb9jW1rKurZ6amUg7O/X4pfEAAAABdFJOUwBA5thmAAAB4ElEQVRo3u2a7aKDIAiGU8Du/45PmhmUla3SncX7Z5Hpk19EtK5byjym7lgKfxPcVJHCFd4WbqpL4QpvADcNtYY7AJAHBrzQMCOZCElurJIkTCyDg7VWHhjrNVW3lptok2CskiTME3BLhmIDgQbBxPmOiLc3G/P9bvWjBO7QRTgOfRtGlKC3hDOcj+TdcDl0rIFcM9XgbvjBURtwVhrrIt4ETwtuc85ZKVsgJ+AEFqhPcPLqYwNE0XSUhcdynE0YLiUq32o0rHdYbpf8fB7M+fZG24T7SZvhYRJHk6Y+lMLRl37qZPbNgtWOZ53MNi1se69x22fgzL3GKi6cvQFevNpZ3ROrvelTTeFfCRfxwSJ6eBy+8t45//cMvOAJq/Aq8GVsURW+/9h8GM6iB11wvwhfBBN14Rn3qo9Uhd8MF9kFmWxYZyZkVsOX0yW48N7Sma8zE9IdYMg0fA4f2y1+Y2EXX4bHzMQ0kiXw9J53GV6QbFi9sVBLuMOGcBbMVoaTE/C9MON+eNp9NzgZIh8omSknUZIcSDm8yz0/vc/lC/n+nB+nnoed3qfoYZmZwHAYzrlc4u0q/BH3qp85Xg3XD7kKfxtc/6TzVvhzN/Lf4V0tKfwL4F1dKbwpvGuhX4b/AaFxLjt4uoaRAAAAAElFTkSuQmCC");
      game.load.image("catchPhraseAlt", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABcBAMAAABenMy7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAP///yYRD3dwb9jW1rKurZ6amUg7O/X4pfEAAAABdFJOUwBA5thmAAAB3ElEQVRYw+2YzXKCMBCA9Q0aDd5dpD3Daj1j095RMz1r7Qv4/odufpBfFcJ06hT2AMlkv4VsNpuF0cjKmLWQp1FZeou3YqsWBtwNd2DzFgbcEWed5ILPMGTsC6mFuKTrFBFjxjgqOcz0DUkBzXAZn8KcsQioBbCg6wQAFA5Kwqm+ASmAGa7ikGxJgYHvkYKytlU8Uz1jnBn7abuMn46EC3j11kGsdHbYCrevpxUyHSd8Fi2EEDncdGmUvzXAtevyczddGvWgHg+i1VnhUn6SgielPH9neEB9hcvds0xqF26bRHZpcjMtz72wbgVcxBoXgmbnqUfU4e/g3wqbvOfrcH4tbAo43/iI532G+zpoafQD/PAuXut5uO75jjvuX+EqXdCO0/kBw9b4JA3yLAhb4Pl1dHj5R8EpTcQd8NIWbYtTmtizXnk+TReOeBa0PdzvzripH2y6uFQXtvbguLqDmyC3nr9UF/bU4BDcxsGvPWUgbIRTdaHKpCq+jJvgNk6qOCTd8FM3XJ1xznhwNHgxdzTG5xuN3wsbCZLqmqSK82OTp19bd1Vk1sy9UpCLF6SqMk0XHNdUWBwULqImePOgHT6Fhg/wP8R7/tOplZFfwm/KuMd4ZqGXuLXwIPgPRbGDxg7FjqIAAAAASUVORK5CYII=");
      game.load.image("catchPhrase2", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABcCAMAAACbbCG6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///yYRD7OvrtTS0nVubefm5pmVlExAPz4awkgAAAABdFJOUwBA5thmAAACS0lEQVRo3u2aiZaDIAxFhRDg/794srgALu1Yq86YnB6wGrgFMY+07brW3Nese20GfxLcnWIGN/i1cHe6GdzgF8DdhWbwu8EDqLXnqCrLxjvSy7koB2phDxwQvc+YilMxZfTUGXoMLlI59w6eHbjkt2ywc9q9r1sylDsnjucC594lHD665017fUslw9luCFcbDsJhcL6LAqfpB1yBQwgg8BTIjhs50upVuIOIX5z2GOTDx8VpR11+23AZednBLx612X39LVwNLLwa3OAtvJfFWV0+/r3QjpIZ2+YkouPBpMszeW7hAUUFo9aeg1iWumR7upSRI5AoJhYXEwdfFtHxYNTl4KXVBnyICHU0qeIEhR4tw6JmjGeny1Ps0bbL8MZ/OZR9At+65+IQ/KgJL+Fi78G5mnnPRw7vw2Eumetw9qX1ElfgtJZSKNRwgEMu9mE7p133lU2besFhTrIP4JqWM8qugetyo+jpEm0kN+GRuwFVU4Wj7jFWRy4TrDuftq67F6HdhGOhpu/dc4vtBn8wXFPMNu9sPPry4CyVVTCnKDlInPLO6umewm+RpZbee7NU7gA1mlCYGKJuHVuq2D/mavBxxlLLF1Yh/wW89D4C7v0qXOfn2CwVZJuUlZlW4ZnIuYaP3vuzVJYl4EycpzCkAa66WwoRZF/DC+8jpl2+gNGx1KrII3eJRz7ktLX33iy12TVMeadbftT6nNay1PvDr/zq2X5pMPgFcPsh1+BPg9ufdJ4K/94H+evw7iwz+A3g3blm8Evh3RX2n+E/ZbkwYUvzVyoAAAAASUVORK5CYII=");
      game.load.image("catchPhrase2Alt", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABcBAMAAABenMy7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAP///yYRD7OvrtjW1nVubZmVlExAPwLos5UAAAABdFJOUwBA5thmAAACG0lEQVRYw+2YS3PbIBDHnW9QjJy7V5Ce0WN6BuHejU19bsed3DMjf/7y1CNxJD/SSWtrB0Z44YcA7fpveTYL9oDOsC+z13a3+Fns2xkm/DL8ArY7w4RfiKOr7IbwKs/z2ELYleiuClQV5prz9/FSff3hGsmz4gvKV7RxC4IEgVprNrD4eeqvCyrIApaKNm6Ps+G9R9yMgxIAPg43n4itJ+G1hpKKsoOnMiOwl/wkfJMbHK/OW7wUT7JdPDUn+ArfSznw4LK42/dwY+xGY/4/xW0mxupzzrSSJkFx6Cusi+GY1hFPdlrLnVaFqlXhPJjqWoLW2uGPGjT7regGa6h/Cl3zHm6D1dR5qtYhbrMlMjHehFhim4K4iDJt09vBXWfAkSmjeH/vxiFAHMEBlm9xNG/cDY6P4kXMkB6eyIryLp7tk4jjmo0tPudx/eHoFocKVgcpNmorNv7rkcjnbR+XWSodror+3RFSADzWMB5o0sdNX3p071PGfTqeWx31UhoczJRTFTahBy5SbqVU+WEuiJ3Cevegwgqi1gKYlRNBWtxrHBtTGQymCKBunB/awemJuJXSFicRH1VYDHpnEu9XF6/pi8ede1BhMeQlCPLd4tUT96n0DTzu3eOLJ4kyt8m2/ujqx5e1Fd7gHlLYgHspRe3JW+G9RYW94gf5lfj0KjS9gH8ifud/Op01yV/CB+3hjvF2hrvEwwz/CP4Hrwma2v+moKwAAAAASUVORK5CYII=");
      game.load.image("blood", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURQAAAHMIEHcKDXcIEXYKDXcJDXYJDXcKDgdccrgAAAAHdFJOUwAf3h7fvr1opIWIAAAAX0lEQVQI11XOMQqAQAwEwBU/cASxFwtbsbC/H9j5DznI9zWX3cKtliEkAb6cO5hxW1UPf4rQfRE6OZAcmJzY2bIF36x+YWJrBQNnKzTcYnFy7ddMmFz5mQmDhcBc8M8LmC8m0BaJpJMAAAAASUVORK5CYII=");
      game.load.image("dead", "data:image/png;base64,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");
      game.load.image("facebook", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAlAQMAAACJRsKOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURQAAAP///6XZn90AAAABdFJOUwBA5thmAAAAmklEQVQoz6XSQQ6DIBAF0Gm66NILeBRSz9VFY4/mUcZwgOIOA/orKWCKpJHwly9kJsMMUY8kmug8Xl+U5FaCLR3CBchHbIsQazM0ExZwz5Cs/mGnumXDGQZGflHTXYmnuqgHGzZy8LhaG/EdUIuNAvru2iEmzA5tguMPwu4vQb6mw1AzohYi1z2L+5hxogye/c/KbVbeUt0lfwA8eSwCXxL4pQAAAABJRU5ErkJggg==");
      game.load.image("twitter", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAlAQMAAACJRsKOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURQAAAP///6XZn90AAAABdFJOUwBA5thmAAAAeUlEQVQoz6XSOwrAIAwG4ECHjF5A6FHr0XTyGPUExU5aOqQPRIpSq/XP9g2BPAAmSuIB6nEQkARbkEMW04AmR/6K02Y8eVrJnSWr0QZEZTwTTIwoUf3BJSBp/YEUkSBDiQ/cI86yjNdEd0+nbQnr95lj5zU7f6nvkw9kavhY4h1q4AAAAABJRU5ErkJggg==");
      game.load.image("tryAgain", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAApCAMAAABtLmckAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURQAAAP///////////////////////////////////////////////////////9eSSs2PTvbm2NW2mMeWZfj4+NKQS8eRXcyjfePMt/j398eSXte4nPdoeecAAAAOdFJOUwDP3zAgYJ9/QL/vcBCPGWRKwwAAAxZJREFUaN7tmYmS2yAMQH0jsim1k+72+v//LFjCiCsms7abaa2dzQzGAj0pyLJSVTvK10iqf0lOvP2lF056Pe7YWHT6AghPjA6frrhOEm+cbgk8oP1I2zcEp5Zb+F5cIls7f6hFKifSrMnGCszayhOjw6crrpPGUyk8QfuRtm8ITi238L08F4W2gj8kPDnzStVoZ813oAOUGrQTzCYNjx5OCNHoT5hdNqCG+exCvPs0qWmasnikzQ2x0VvF63BXNKdzhljTCU+wDcFFAVd1bq74ZacJPKgQ4c2+zOMt2s6QKMA5vMqfjEz/FJ45LMBXDY6IAfq4/VA/Dd7tlsQD7fAGz+yr4XknIJM5Tey+6T+MX2w7W/xgPACHVwPJrKFV3mhsgtXKWt9Hcg3xvo+/1O9xnFJ4NQzqIr84vIFWaTGp64XnnbVdst0YzyYgEeZNlzmtZpywHN4dM2cST/EvRpjC8yn5WTx0GnoSY0YuM04zdlwkCVlCctGaGD8SE9YrxxvvI+Ld7xm8mkI1G9LQOhRQ/GIYQz6Fl3nuhQ+oSKLj4sVv/bnnhSo+e48O9jN43GmA7sIYXvfFu8gGD/a+eCJez69aMpkTdVOrllYtwn1PTrzt8DKZ06851zPnes0Jdtm45nwWL1dz7ow3/UW8A973xvfzdfbEO+WUhPCeBkTDkrbI0tXpUp0S136xCwY9nkRvZkPhKVtEw8JXMxkk7GR1655SwZtK1JvZOHoN9UIAGQaBF6WAIjzszdj+TGXf0130et3skfN/v0RvsI2filo+/S54wfM/LMtK8HBCxvH21/cvQxha+Zp4tnfVU7yB+nLsYKYmIryll/daeKFGJnZhWCO8oBu0L14LNV1ca4vk8K62hVOMV8PbUXgyVVav1L0+nldQF+GtN182wTO9Mh0x/Y7fF7RFrAZQvC0DafktnyzeBe8+Ai9+7Xh0JnzXi5JfGBJ4sqh1tglerftkJiJdMV5N3bUsHrZ8mkd4rY3f/mdPekXGOl4618ITZ887rSfehpnzWbyg5ozxDqw5/wO8U045VP4AxYaM12QNC+sAAAAASUVORK5CYII=");
    },

    "create": function() {
      game.state.start("start");
    }
  };
});