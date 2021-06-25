            document.getElementById("start").addEventListener('click', startTimer);
            document.getElementById("cancel").addEventListener('click', cancelButtonPressed);


            const song = document.querySelector(".song");
            const play = document.querySelector(".play");
            const replay = document.querySelector(".replay");

            const outline = document.querySelector(".moving-outline circle");
            const outlineLength = outline.getTotalLength();

            outline.style.strokeDashoffset = outlineLength;
            outline.style.strokeDasharray = outlineLength;

            var startTime;
            var endTime;
            var origTimePeriod;
            var newTimePeriod;
            var timer; 
            var cancelled = false;
            //var animate = 150;
            
            
            function startTimer()
            {
                cancelled = false;
                startTime = new Date();
                endTime = getEndTime();
                
                origTimePeriod = endTime.getTime() - startTime.getTime();
                
               
                newTimePeriod = origTimePeriod;
                timer =setInterval(displayCountdown, 1000);
                
            }
            
           
            
            
            function displayCountdown()
            {
                var timeLeft = msToTime(newTimePeriod);
                document.getElementById("clock").innerHTML = `<p>${timeLeft["hours"]}h ${timeLeft["minutes"]}m ${timeLeft["seconds"]}s</p>`;
                
                
                let progress = outlineLength - (newTimePeriod / origTimePeriod) * outlineLength;
                outline.style.strokeDashoffset = progress;
            
                
                
                
                newTimePeriod -= 1000;
                
                if(newTimePeriod < 0 || cancelled)
                    {
                        clearInterval(timer);
                        document.getElementById("clock").innerHTML = "<p>complete!</P>";
                        outline.style.strokeDashoffset = outlineLength;
                        
                    }
                
                
            }
            
            
            function cancelButtonPressed()
            {
                cancelled = true;
                
            }
            
            function msToTime(milliseconds)
            {
                var mHour = 1000 * 60 * 60;
                var mMinute = 1000 * 60;
                var mSecond = 1000;
                
                var hours = Math.floor(milliseconds / mHour);
                var minutes = Math.floor((milliseconds % mHour)/mMinute);
                var seconds = Math.floor((milliseconds % mMinute)/mSecond);
                
                var time = [];
                time["hours"] = hours;
                time["minutes"] = minutes;
                time["seconds"] = seconds;
                
                return time;
            }
            
            
            function getEndTime()
            {
                var dt = new Date();
                var hours = parseInt(document.getElementById("hours").value);
                var minutes = parseInt(document.getElementById("minutes").value);
                var seconds = parseInt(document.getElementById("seconds").value);
                
                dt.setHours(dt.getHours() + hours);
                dt.setMinutes(dt.getMinutes() + minutes);
                dt.setSeconds(dt.getSeconds() + seconds);
                return dt;
            
            }