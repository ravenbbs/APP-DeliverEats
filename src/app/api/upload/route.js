export async function POST(req){
  const data =  await req.formData();

  console.log(data)
   if (data.get('file')) {
     const file = data.get('file');
     console.log(file)
   }
  return Response.json(true);
}