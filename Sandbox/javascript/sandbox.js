(function(){
  function log() { console.log('iife1'); }
})()

(function(w){
  function log() { console.log('iife2'); }
})(window || global)
