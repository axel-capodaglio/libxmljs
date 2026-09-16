// Da eseguire UNA SOLA VOLTA sull'output appena generato da SWIG: le due prime sostituzioni non sono
// rieseguibili, perché il testo sostituito contiene quello cercato e una seconda passata lo duplica.
var fs = require("fs");
var path = __dirname + "/../src/libxml2.cc";
var source = fs.readFileSync(path).toString();

fs.writeFileSync(
    path,
    source
        .replace(
            "v8::Persistent<v8::Object> handle;",
            `v8::Persistent<v8::Object> handle; int refCount; xmlNode* ancestor; xmlDoc* doc;
            
            void Ref();
            void Unref();`
        )
        .replace(
            "swigCMemOwn(false), swigCObject(0), info(0)",
            "swigCMemOwn(false), swigCObject(0), info(0), refCount(0), ancestor(NULL), doc(NULL)"
        )
        // V8 13 (Node 24+) ha rimosso FunctionCallbackInfo::Holder() e SetAccessor su Object/ObjectTemplate,
        // che il backend V8 di SWIG usa ancora: senza queste sostituzioni il modulo non compila da Node 24 in su.
        // Restano compatibili con Node 22, quindi non servono guardie #if V8_MAJOR_VERSION.
        .replace(/\.Holder\(\)/g, ".This()")
        .replace(/->SetAccessor\(/g, "->SetNativeDataProperty(")
);
