const airports = [
  ["Nairobi – Wilson","NBO"],["Kisumu","KIS"],["Wajir","WJR"],["Hombabay","HMA"],["Maasai Mara","MRE"],
  ["Ukunda / Diani","UKA"],["Amboseli","ASV"],["Samburu","UAS"],["Lamu","LAU"],["Malindi","MYD"],
  ["Nanyuki","NYK"],["Mombasa","MBA"],["Kitale","KTL"]
];
const passengers = [1,2,3,4,5,10,20,40,60,80,81,90,100];

const routes = [
 {name:"Maasai Mara",from:"NBO",to:"MRE",freq:"4× daily",dep:"07:00",arr:"07:45",duration:"45 min",price:8500,tag:"Daily",img:"https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=85",desc:"Wildebeest migration Maasai Mara"},
 {name:"Diani / South Coast",from:"NBO",to:"UKA",freq:"3× daily",dep:"06:30",arr:"07:40",duration:"1h 10min",price:11200,tag:"Popular",img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",desc:"Diani Beach Kenya"},
 {name:"Amboseli",from:"NBO",to:"ASV",freq:"2× daily",dep:"07:30",arr:"08:25",duration:"55 min",price:9800,tag:"Daily",img:"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=85",desc:"Elephants with Mount Kilimanjaro Amboseli"},
 {name:"Samburu",from:"NBO",to:"UAS",freq:"2× daily",dep:"07:00",arr:"08:00",duration:"1h 00min",price:10500,tag:"Daily",img:"https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=900&q=85",desc:"Reticulated giraffe Samburu"},
 {name:"Lamu Island",from:"NBO",to:"LAU",freq:"Daily",dep:"07:00",arr:"08:30",duration:"1h 30min",price:14000,tag:"Popular",img:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",desc:"Lamu Island dhow Kenya"},
 {name:"Kisumu",from:"NBO",to:"KIS",freq:"2× daily",dep:"07:30",arr:"08:20",duration:"50 min",price:7200,tag:"Daily",img:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85",desc:"Lake Victoria Kisumu Kenya"},
 {name:"Malindi",from:"NBO",to:"MYD",freq:"4× weekly",dep:"08:00",arr:"09:20",duration:"1h 20min",price:12500,tag:"New Route",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",desc:"Malindi coast Kenya historic town"},
 {name:"Nanyuki / Mt Kenya",from:"NBO",to:"NYK",freq:"2× daily",dep:"07:00",arr:"07:35",duration:"35 min",price:6800,tag:"Daily",img:"https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?auto=format&fit=crop&w=900&q=85",desc:"Mount Kenya summit"},
 {name:"Mombasa",from:"NBO",to:"MBA",freq:"Daily",dep:"08:00",arr:"09:00",duration:"1h 00min",price:8000,tag:"New Route",img:"https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=85",desc:"Mombasa coast Kenya"},
 {name:"Kitale",from:"NBO",to:"KTL",freq:"Daily",dep:"09:00",arr:"10:10",duration:"1h 10min",price:10000,tag:"New Route",img:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",desc:"Green highlands near Kitale Kenya"},
 {name:"Wajir",from:"NBO",to:"WJR",freq:"3× weekly",dep:"07:15",arr:"08:50",duration:"1h 35min",price:13500,tag:"Regional",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",desc:"Northern Kenya dry landscape near Wajir"},
 {name:"Homabay",from:"NBO",to:"HMA",freq:"2× daily",dep:"08:00",arr:"09:05",duration:"1h 05min",price:7900,tag:"Lake Route",img:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85",desc:"Lake and green landscape near Homabay"}
];

const galleryImages = [
 "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=85",
 "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=85",
 "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=85",
 "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85"
];

const $ = s => document.querySelector(s);
let currentStep = 1;
let booking = {};
let selectedSeat = null;
let galleryOffset = 0;
let currentRoute = routes[0];

function money(n){ return "KES " + Number(n).toLocaleString("en-KE"); }
function airportName(code){ const a=airports.find(x=>x[1]===code); return a ? a[0] : code; }
function setSteps(step){
 currentStep=step;
 document.querySelectorAll(".step").forEach(el=>el.classList.toggle("active",Number(el.dataset.step)===step));
}
function fillSearch(){
 const from=$("#from"), to=$("#to"), pax=$("#passengers");
 airports.forEach(([name,code])=>{from.add(new Option(`${name} (${code})`,code));to.add(new Option(`${name} (${code})`,code));});
 from.value="NBO"; to.value="MRE";
 passengers.forEach(n=>pax.add(new Option(`${n} Passenger${n===1?"":"s"}`,n)));
 pax.value="1";
 const today=new Date(); const iso=today.toISOString().slice(0,10);
 $("#depart").value=iso; $("#returnDate").value=iso;
}
function renderRoutes(){
 $("#routeGrid").innerHTML = routes.map((r,i)=>`
 <article class="route">
   <div class="route-img"><img src="${r.img}" alt="${r.desc}" loading="lazy"><span class="tag ${r.tag==="New Route"?"orange":""}">${r.tag}</span></div>
   <div class="route-body">
     <h3>${r.name}</h3>
     <div class="route-meta">${r.from}✈${r.to} · ${r.freq}</div>
     <div class="route-times">
       <div><strong>${r.dep}</strong><small>${r.from} · Departs</small></div>
       <div class="duration">${r.duration}</div>
       <div><strong>${r.arr}</strong><small>${r.to} · Arrives</small></div>
     </div>
     <div class="route-bottom">
       <div class="route-price"><strong>${money(r.price)}</strong><small>from / per person</small></div>
       <div class="route-actions"><button class="explore" onclick="openDestination(${i})">🔭 Explore</button><button class="route-book" onclick="openBooking('${r.from}','${r.to}')">Book →</button></div>
     </div>
   </div>
 </article>`).join("");
}
function renderGallery(){
 const start=galleryOffset;
 const shown=[];
 for(let i=0;i<4;i++) shown.push(galleryImages[(start+i)%galleryImages.length]);
 $("#gallery").innerHTML=shown.map((src,i)=>`<figure><img src="${src}" alt="Wild Kenya gallery ${start+i+1}" loading="lazy"></figure>`).join("");
}
function slideGallery(dir){ galleryOffset=(galleryOffset+dir+galleryImages.length)%galleryImages.length; renderGallery(); }

function toggleMobileNav(){ $("#mainNav").classList.toggle("mobile"); }
function closeMobile(){ $("#mainNav").classList.remove("mobile"); }

document.querySelectorAll(".trip-tab").forEach(btn=>{
 btn.addEventListener("click",()=>{
  document.querySelectorAll(".trip-tab").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const mode=btn.dataset.trip;
  $("#returnWrap").style.display = mode==="roundtrip" ? "" : "none";
 });
});
$("#couponToggle").addEventListener("click",()=>$("#couponArea").classList.toggle("open"));
function applyCoupon(){
 const v=$("#coupon").value.trim();
 $("#couponMsg").textContent=v ? "Coupon entered." : "";
}

function findFlights(){ openBooking($("#from").value,$("#to").value); }

function openBooking(from="NBO",to="MRE"){
 closeMobile();
 const route=routes.find(r=>r.from===from && r.to===to) || routes[0];
 currentRoute=route;
 booking={from:route.from,to:route.to,price:route.price,dep:route.dep,arr:route.arr,duration:route.duration,pax:Number($("#passengers")?.value||1),date:$("#depart")?.value||""};
 selectedSeat=null;
 $("#bookingModal").classList.add("show"); document.body.classList.add("lock");
 setSteps(1); renderPassenger();
}
function closeBooking(){ $("#bookingModal").classList.remove("show"); document.body.classList.remove("lock"); }
function renderPassenger(){
 $("#bookingContent").innerHTML=`
 <h2>Book Your Flight</h2>
 <div class="booking-summary"><h3>${airportName(booking.from)} → ${airportName(booking.to)} · Roundtrip · ${booking.pax} Passenger${booking.pax===1?"":"s"}</h3>
 <div class="summary-line"><b>${booking.from} ✈ ${booking.to}</b> &nbsp; Dep <b>${booking.dep}</b> · Arr <b>${booking.arr}</b> · ~${booking.duration}</div>
 <div class="booking-price">${money(booking.price)} <span style="font-size:11px;color:#7a827d;font-weight:500">per person · roundtrip</span></div></div>
 <form id="passengerForm" novalidate>
  <div class="form-grid">
   <label class="form-field">First Name *<input id="firstName" required placeholder="John"></label>
   <label class="form-field">Last Name *<input id="lastName" required placeholder="Kamau"></label>
   <label class="form-field">Email Address *<input id="email" type="email" required placeholder="john@example.com"></label>
   <label class="form-field">Phone Number *<input id="phone" required placeholder="+254 700 000 000"></label>
   <label class="form-field">Nationality<select id="nationality"><option>Kenyan</option><option>Tanzanian</option><option>Ugandan</option><option>British</option><option>American</option><option>German</option><option>French</option><option>Other</option></select></label>
   <label class="form-field">ID / Passport No.<input id="passport" placeholder="A12345678"></label>
   <label class="form-field">Travel Date *<input id="travelDate" type="date" required value="${booking.date}"></label>
   <label class="form-field">Passengers *<select id="bookPax" required>${passengers.map(n=>`<option value="${n}" ${n===booking.pax?"selected":""}>${n} Passenger${n===1?"":"s"}</option>`).join("")}</select></label>
   <label class="form-field">Meal Preference<select id="meal"><option>Standard</option><option>Vegetarian</option><option>Vegan</option><option>Halal</option><option>Kosher</option><option>None</option></select></label>
   <label class="form-field wide">Special Requirements<textarea id="special" placeholder="Wheelchair, extra baggage, infant car seat…"></textarea></label>
   <div id="formError" class="form-error wide">Please complete all required fields correctly before continuing.</div>
   <div class="required-note wide">Step 1 of 4 · All * fields required</div>
   <div class="form-actions wide"><span></span><button class="primary-btn" type="submit">Select My Seat →</button></div>
  </div>
 </form>`;
 $("#passengerForm").addEventListener("submit",e=>{e.preventDefault();submitPassenger();});
}
function submitPassenger(){
 const fields=["firstName","lastName","email","phone","travelDate","bookPax"];
 let valid=true;
 fields.forEach(id=>{const el=$("#"+id);if(!el.value.trim() || (id==="email" && !el.validity.valid)){el.style.borderColor="#d55b42";valid=false}else el.style.borderColor="#d6dbd6";});
 if(!valid){$("#formError").classList.add("show");return;}
 booking.first=$("#firstName").value.trim();booking.last=$("#lastName").value.trim();booking.email=$("#email").value.trim();
 booking.phone=$("#phone").value.trim();booking.nationality=$("#nationality").value;booking.passport=$("#passport").value.trim();
 booking.date=$("#travelDate").value;booking.pax=Number($("#bookPax").value);booking.meal=$("#meal").value;booking.special=$("#special").value.trim();
 setSteps(2); renderSeats();
}
function renderSeats(){
 const taken=["2B","3A","3C","4D","5B","6A","6B","7C","9A","9D","11B","11C"];
 let html="";
 for(let row=1;row<=12;row++){
   for(const col of ["A","B","C","D"]){
     const id=row+col, isTaken=taken.includes(id), isExit=[4,9].includes(row);
     html+=`<button type="button" class="seat ${isTaken?"taken":""} ${isExit?"exit":""}" ${isTaken?"disabled":""} onclick="selectSeat('${id}',this)">${isTaken?"✕":col}</button>`;
   }
 }
 $("#bookingContent").innerHTML=`
 <h2>Choose Your Seat</h2><p class="seat-note">Click an available seat. Exit rows (orange) offer extra legroom.</p>
 <div class="legend"><span><i class="dot available"></i>Available</span><span><i class="dot selected"></i>Your Seat</span><span><i class="dot taken"></i>Taken</span><span><i class="dot exit"></i>Exit Row</span></div>
 <div class="cockpit">✈ COCKPIT</div>
 <div class="aircraft"><div class="seat-grid">${html}</div></div>
 <div class="selected-panel"><b>Selected Seat</b><h3 id="selectedSeatText">None selected</h3><small id="selectedHint">Please select a seat above</small>
 <div class="total-row"><span>Total</span><span id="seatTotal">${money(booking.price*booking.pax)}</span></div></div>
 <div class="group-note">Group booking seating For groups above 12 passengers, the airline team will allocate seats together where possible. You can continue without selecting one individual seat.</div>
 <div class="form-actions"><button class="secondary-btn" onclick="setSteps(1);renderPassenger()">← Back</button><button class="primary-btn" onclick="continueToTicket()">Generate My Ticket →</button></div>`;
}
function selectSeat(id,el){
 document.querySelectorAll(".seat.selected").forEach(s=>s.classList.remove("selected"));el.classList.add("selected");selectedSeat=id;
 $("#selectedSeatText").textContent=id;$("#selectedHint").textContent="Your selected seat";
}
function continueToTicket(){
 if(!selectedSeat && booking.pax<=12){ alert("Please select a seat above."); return; }
 setSteps(3);renderTicket();
}
function renderTicket(){
 const ref="RA-"+Math.random().toString(36).slice(2,8).toUpperCase();
 booking.ref=ref; booking.seat=selectedSeat || "Group allocation";
 $("#bookingContent").innerHTML=`
 <h2>Your Boarding Pass</h2><p class="seat-note">Review your ticket below. Download or share it on WhatsApp before confirming.</p>
 <div id="ticketCard" class="ticket-card">
  <div class="ticket-head"><div><div class="ticket-airline">✈ RENEGADE AIR</div><small>Kenya's Regional Airline · Be Different</small></div><div class="ticket-ref"><small>BOOKING REFERENCE</small><strong>${ref}</strong></div></div>
  <div class="ticket-route">${booking.from} ✈ ${booking.to}</div>
  <div class="ticket-details">
   <div>PASSENGER<strong>${booking.first} ${booking.last}</strong></div><div>DATE<strong>${booking.date}</strong></div><div>DEPARTURE<strong>${booking.dep}</strong></div><div>ARRIVAL<strong>${booking.arr}</strong></div>
   <div>SEAT<strong>${booking.seat}</strong></div><div>PASSENGERS<strong>${booking.pax}</strong></div><div>MEAL<strong>${booking.meal}</strong></div><div>FARE<strong>${money(booking.price*booking.pax)}</strong></div>
  </div>
 </div>
 <div class="ticket-actions"><button class="primary-btn" onclick="downloadTicket()">⬇ Download Ticket (PNG)</button><button class="primary-btn whatsapp-btn" onclick="shareWhatsApp()">📱 Screenshot ticket & share on WhatsApp</button></div>
 <p class="share-note"><b>Before you confirm on WhatsApp</b><br>Download the ticket above or use the screenshot/share button. Review the filled message below, then send the ticket image and message to Renegade Air on WhatsApp.</p>
 <div class="message-box" id="whatsappMessage"></div>
 <p class="share-note">Your ticket is ready. Share it first, then confirm your booking.</p>
 <div class="form-actions"><button class="secondary-btn" onclick="setSteps(2);renderSeats()">← Back</button><button class="primary-btn" onclick="confirmAfterWhatsApp()">Confirm After WhatsApp ✓</button></div>`;
 $("#whatsappMessage").textContent=buildWhatsAppMessage();
}
function buildWhatsAppMessage(){
 return `Hello Renegade Air, I would like to confirm my booking.\nBooking Reference: ${booking.ref}\nPassenger: ${booking.first} ${booking.last}\nRoute: ${booking.from} → ${booking.to}\nDate: ${booking.date}\nPassengers: ${booking.pax}\nSeat: ${booking.seat}\nFare: ${money(booking.price*booking.pax)}`;
}
function shareWhatsApp(){
 const url="https://wa.me/0752737113?text="+encodeURIComponent(buildWhatsAppMessage());
 window.open(url,"_blank");
}
function downloadTicket(){
 const card=$("#ticketCard"); const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
 canvas.width=1200;canvas.height=720;ctx.fillStyle="#ffffff";ctx.fillRect(0,0,1200,720);
 ctx.fillStyle="#063d2b";ctx.fillRect(0,0,1200,130);ctx.fillStyle="#b6d83f";ctx.font="800 42px Arial";ctx.fillText("✈ RENEGADE AIR",55,75);
 ctx.fillStyle="#ffffff";ctx.font="18px Arial";ctx.fillText("Kenya's Regional Airline · Be Different",55,105);
 ctx.fillStyle="#17251f";ctx.font="800 42px Arial";ctx.fillText(`${booking.from}  ✈  ${booking.to}`,55,205);
 ctx.font="22px Arial";ctx.fillText(`Booking Reference: ${booking.ref}`,55,250);
 const lines=[
 `Passenger: ${booking.first} ${booking.last}`,`Date: ${booking.date}`,`Departure: ${booking.dep}`,`Arrival: ${booking.arr}`,
 `Seat: ${booking.seat}`,`Passengers: ${booking.pax}`,`Meal: ${booking.meal}`,`Fare: ${money(booking.price*booking.pax)}`
 ];
 ctx.font="22px Arial"; lines.forEach((t,i)=>ctx.fillText(t,55+(i%2)*560,315+Math.floor(i/2)*70));
 ctx.fillStyle="#063d2b";ctx.font="16px Arial";ctx.fillText("Please present this boarding pass at check-in.",55,655);
 const a=document.createElement("a");a.download=`renegade-ticket-${booking.ref}.png`;a.href=canvas.toDataURL("image/png");a.click();
}
function confirmAfterWhatsApp(){
 setSteps(4);
 $("#bookingContent").innerHTML=`
 <div class="confirm"><div class="confirm-icon">🎉</div><h2>Booking Confirmed!</h2><p>Your flight is booked. Your e-ticket has been issued — keep the reference below.</p>
 <div class="ref-large">${booking.ref}</div>
 <div class="confirm-details"><b>Route:</b> ${booking.from} → ${booking.to}<br><b>Passenger:</b> ${booking.first} ${booking.last}<br><b>Seat:</b> ${booking.seat}<br><b>Date:</b> ${booking.date}<br><b>Passengers:</b> ${booking.pax}</div>
 <div class="ticket-actions" style="justify-content:center"><button class="primary-btn" onclick="downloadTicket()">⬇ Download Ticket</button><button class="primary-btn whatsapp-btn" onclick="shareWhatsApp()">Send to WhatsApp</button></div>
 <div class="form-actions" style="justify-content:center"><button class="secondary-btn" onclick="closeBooking()">Done – Close ✓</button></div></div>`;
}

const destinationCopy={
 "Maasai Mara":{about:"A spectacular safari destination famous for the Great Migration, big cats and wide-open savannah.",schedule:"Daily departures from Nairobi with multiple flight times.",expect:"Wildlife, game drives and dramatic sunsets.",tips:"Carry sun protection, comfortable clothing and a light jacket for early-morning drives."},
 "Diani / South Coast":{about:"A tropical Indian Ocean escape with white sand beaches, coral reefs and warm coastal waters.",schedule:"Three daily services from Nairobi.",expect:"Beach stays, water activities and relaxed coastal dining.",tips:"Pack swimwear, sunscreen and light clothing."},
 "Amboseli":{about:"A classic safari landscape with elephants and views toward Mount Kilimanjaro.",schedule:"Two daily services from Nairobi.",expect:"Elephant sightings and expansive scenery.",tips:"Early starts are recommended for the best wildlife viewing."},
 "Samburu":{about:"Northern Kenya's rugged reserve is home to unique wildlife and spectacular dry-country scenery.",schedule:"Two daily services from Nairobi.",expect:"Giraffes, elephants and distinctive Samburu landscapes.",tips:"Bring a hat, water and sturdy walking shoes."}
};
function openDestination(i){
 const r=routes[i], c=destinationCopy[r.name]||{about:`Discover ${r.name}, one of Kenya's memorable regional destinations.`,schedule:`${r.freq} from Nairobi.`,expect:"Local scenery, culture and unforgettable travel experiences.",tips:"Check your travel documents and arrive early for check-in."};
 $("#destinationContent").innerHTML=`
 <div class="destination-hero" style="background-image:url('${r.img}')"></div>
 <div class="destination-body"><div class="eyebrow">${r.tag}</div><h2>${r.name}</h2><p>${c.about}</p>
 <div class="destination-tabs"><button class="active" onclick="destinationTab(this,'aboutPanel')">About This Destination</button><button onclick="destinationTab(this,'schedulePanel')">Flight Schedule</button><button onclick="destinationTab(this,'expectPanel')">What To Expect</button><button onclick="destinationTab(this,'tipsPanel')">Travel Tips</button></div>
 <div id="aboutPanel" class="destination-panel">${c.about}</div><div id="schedulePanel" class="destination-panel" style="display:none">${c.schedule}<br>${r.from} → ${r.to} · ${r.dep} departure · ${r.arr} arrival · ${money(r.price)} from / per person.</div>
 <div id="expectPanel" class="destination-panel" style="display:none">${c.expect}</div><div id="tipsPanel" class="destination-panel" style="display:none">${c.tips}</div>
 <button class="primary-btn destination-book" onclick="closeDestination();openBooking('${r.from}','${r.to}')">Book This Route →</button></div>`;
 $("#destinationModal").classList.add("show");
}
function destinationTab(btn,id){
 document.querySelectorAll(".destination-tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 document.querySelectorAll(".destination-panel").forEach(p=>p.style.display="none");$("#"+id).style.display="block";
}
function closeDestination(){ $("#destinationModal").classList.remove("show"); }

window.addEventListener("keydown",e=>{if(e.key==="Escape"){closeBooking();closeDestination();}});
window.addEventListener("click",e=>{if(e.target.id==="bookingModal")closeBooking();if(e.target.id==="destinationModal")closeDestination();});

fillSearch();renderRoutes();renderGallery();
